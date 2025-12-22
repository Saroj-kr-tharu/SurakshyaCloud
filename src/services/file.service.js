const curdService = require("./curdService");
const {fileRepo, userRepo, folderRepo} = require('../repository/index')
const mongoose = require('mongoose')


const s3Service = require('./s3.service');



class userService extends curdService{

       constructor(){
        super(fileRepo) 
    }

    async propagateFolderSize(startFolderId, deltaSize , session=null ) { 
        try {
            let currentFolderId = startFolderId;
            while (currentFolderId) {
                const folder = await folderRepo.findByIdAndUpdateFolder(
                    currentFolderId,
                    { $inc: { size: deltaSize },  },
                    session
                   
                );
                // console.log('folder from  propagate => ', folder )
                    if (!folder) break;

                    currentFolderId = folder.parentId;
                }

        } catch (error) {
            console.log("Something went wrong in service layer (addFiles)", error );
            throw error;
        }
    }

    async addFiles({userId, files, folderId}) { 

        // start transaction 
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            let storageUsed = 0 ; 
            
            // 1. upload to s3 
            const uploaded = await Promise.all(
                files.map(async (file) => {

                    //1.1 generate s3key 
                    const s3Key = s3Service.generateS3Key({
                        userId,
                        originalName: file.originalname
                    });
                    
                    //1.2 push to s3 
                    await s3Service.pushObject({
                        buffer: file.buffer,
                        mimetype: file.mimetype,
                        s3Key,
                        metadata: {
                            originalName: file.originalname,
                            uploadedBy: userId
                        }
                    });

                    // 1.3 increase storageUsed 
                    storageUsed += file.size; 

                    

                    return {
                        ownerId: userId,
                        originalName: file.originalname,
                        s3Key,
                        folderId: folderId, 
                        size: file.size,
                        mimeType: file.mimetype
                    };
                })
            );

            // console.log(' all upload => ', uploaded)

            // 1. create bulk 
            const res = await fileRepo.bulkCreate( uploaded,   session  );

            // // 2. update the storage in user model 
            await userRepo.update(userId,  { $inc: { storageUsed: storageUsed } },   session  )

            // 1.4 mantain the size of folder and folder parents if folderId is mentioned 
            if(folderId){
                  await this.propagateFolderSize(folderId, storageUsed, session);
            }

            // commit transaction  
            await session.commitTransaction();
            session.endSession();

            // return the created Files 
            return res;
        } catch (error) {
            // abort transaction and roll back 
            await session.abortTransaction();
            session.endSession();

            console.log("Something went wrong in service layer (addFiles)", error );
            throw error;
        }
    }


    async viewsFiles(data) {
        try {
            //1. get data from the database using file id findOne,
            const fileData= await fileRepo.get(data.fileId);
          
            if(!fileData) throw new Error(" File is not Found ")

            // 2. check ownership
            if (fileData.ownerId.toString() !== data.userId) 
                    throw new Error("Access denied")
                
            //  2.1 if mode == download then increase the downloadcount +1 ;
            await fileRepo.update(fileData._id.toString(), { $inc: { downloadCount: 1 } } )

            // 3. generate signedurl 
            const signedUrl =  await  s3Service.pullObject({s3Key : fileData.s3Key} )
            
            // 4.return signed url 
            const res = {
                signedUrl, 
                originalName: fileData.originalName, 
            }

           
            return res;
        } catch (error) {
            console.log("Something went wrong in service layer (addFiles)", error );
            throw error;
        }
    }

    async detailFile({ userId, fileId  }) {   
        try {
        //1. get data from the database using file id findOne,
        const fileData= await fileRepo.get(fileId);
        
        if(!fileData) throw new Error(" File is not Found ")

        // 2. check ownership
        if (fileData.ownerId.toString() !== userId) 
                throw new Error("Access denied")

        return fileData;
            
        } catch (error) {
            console.log("Something went wrong in service layer (dertailFolder)", error );
            throw error;
        }
    }


    async deleteFile(data, session=null) {
        try {
            //1. get data from the database using file id findOne,
            const fileData= await fileRepo.get(data.fileId);
            if(!fileData) throw new Error(" File is not Found ")

            // 2 delete from s3 
            const result=  await s3Service.deleteObject(fileData.s3Key)
            if(!result)
                throw new Error(' Deleteing Failed ')

            //  3 delete file by id 
            const res = await fileRepo.destroy(data.fileId, session)
            
            // 4. maintain the size of the folder 
             if(fileData.folderId){
                const size = -fileData.size; 
                await this.propagateFolderSize(fileData.folderId, size, session);
            }
           
            return res;
        } catch (error) {
            console.log("Something went wrong in service layer (deleteFile)", error );
            throw error;
        }
    }

    async deleteManyFile(filesIds, userId, session=null) {
        try { 
           // 1.1 check files is exist or not     
            const filesData = await fileRepo.findManyFiles( {  _id: { $in: filesIds }, ownerId: userId, }  )

            // 1.1.1 check owernship of files with user 
            if(filesData.length !== filesIds.length) 
                throw new Error(" One of files are  not accessible ")
            
            // 1.3 delete all files from s3 
                // 1.3.1 make list of s3key 
                const objects3 = filesData.map(item => ({
                    Key: item.s3Key
                }));

                if(objects3.length == 0 ) throw new Error(" s3 key is not found  ")
                await s3Service.bulkdeleteObject(objects3);
            
            // 1.3 Delete all files from db 
            await fileRepo.deleteManyFiles( { _id: { $in: filesIds } } , session)

            // 1.4 maintain the size of the folder 
                //1.5 check it is root file or inside the folder file 
                const isRoot = filesData.every(file => !file.folderId);
            
                if(isRoot == false){
                    const totalFileSize = filesData.reduce( (acc, file) => acc + file.size, 0 );
                    await this.propagateFolderSize(filesData[0].folderId, -totalFileSize, session);
                }
            
             return {
                totalFiles: filesIds.length
             }

        } catch (error) {
            console.log("Something went wrong in service layer (deleteManyFile)", error );
            throw error;
        }
    }

    async bulkDeleteFileByFolderId(folderIds, userId, session=null) {
        try { 
           // 1.1 check files is exist or not     
            const filesData = await fileRepo.findManyFiles( {  folderId: { $in: folderIds }, ownerId: userId, }  )

            // 1.3 delete all files from s3 
                // 1.3.1 make list of s3key 
                const objects3 = filesData.map(item => ({
                    Key: item.s3Key
                }));

              if(objects3.length > 0)
                await s3Service.bulkdeleteObject(objects3);
            
            // 1.3 Delete all files from db 
            // 1.3. make list of filesIds 
            const filesIds = filesData.map(item => ( item._id ) )
            if(filesIds.length > 0)
                await fileRepo.deleteManyFiles( { _id: { $in: filesIds } } , session)

            

        } catch (error) {
            console.log("Something went wrong in service layer (deleteManyFile)", error );
            throw error;
        }
    }


    async renameFile(data) { 
        try {
        //1. get fileid if exist 
            const fileData= await fileRepo.get(data.fileId);
          
            if(!fileData) throw new Error(" File is not Found ")
        // 1.2. check ownership
            if (fileData.ownerId.toString() !== data.userId) 
                throw new Error("Access denied")
        //1.3 check data.name 
         if (!data.name || !data.name.trim()) 
            throw new Error("New file name is required");
            

        // 2. check name Confict
          const conflict = await fileRepo.findOneFiles({
             ownerId: data.userId,
            folderId: fileData.folderId,
            originalName: data.name,
            _id: { $ne: data.fileId }
          })
          console.log(' cnon =>  ', conflict)
           if (conflict) 
                throw new Error("File with same name already exists in this folder");
    

        // 3.  rename 
            const updatedFile = await fileRepo.update(data.fileId, {
                originalName: data.name
                });

             return updatedFile;

        } catch (error) {
            console.log("Something went wrong in service layer (renameFile)", error );
            throw error;
        }
    }

    async moveFile({ userId ,fileId, targetFolderId}) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {

            //1. check file is existed 
            const fileData= await fileRepo.get(fileId);
           
          
            if(!fileData) throw new Error(" File is not Found ")

            // 1.2. check ownership
            if (fileData.ownerId.toString() !== userId) 
                    throw new Error("Access denied")
            
            // 1.2.3 check the folder and targetfolderId
            if(fileData._id.toString() == targetFolderId)
                throw new Error(" Same Folder Move Does n't occuered  ")
           
            // 2 decrese the file size of old folder id and propagate to its old parent folder 
            if(fileData.folderId)
                await this.propagateFolderSize(fileData.folderId, -fileData.size, session);

            // 3. remove file from old folder and added to new target folder  and  add file to new folder 
            await fileRepo.update(
                    fileId,
                    { folderId: targetFolderId },
                    session 
                );
           
            // 5. incarese the size of folder and propagate to its parent folder 
             await this.propagateFolderSize(targetFolderId, fileData.size, session);

            // 6. commit transaction 
            await session.commitTransaction();
            session.endSession();

            return {
                file:  fileData?.originalName , 
                folder: targetFolderId
            }

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("Something went wrong in service layer (moveFile)", error );
            throw error;
        }
    }

}

const userservice = new userService()


module.exports = userservice;