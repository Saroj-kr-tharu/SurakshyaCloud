const curdService = require("./curdService");
const {fileRepo, userRepo} = require('../repository/index')
const { CLOUDFLARE_CDN_UR } = require("../config/serverConfig");


const s3Service = require('./s3.service');
;

class userService extends curdService{

       constructor(){
        super(fileRepo) 
    }

    async addFiles({userId, files, folderId}) { 
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
            const res = await fileRepo.bulkCreate( uploaded );

            // // 2. update the storage in user model 
            await userRepo.update(userId,  { $inc: { storageUsed: storageUsed } } )
            return res;
        } catch (error) {
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


    async deleteFile(data) {
        try {
            //1. get data from the database using file id findOne,
            const fileData= await fileRepo.get(data.fileId);
          
            if(!fileData) throw new Error(" File is not Found ")

            // 2. check ownership
            if (fileData.ownerId.toString() !== data.userId) 
                    throw new Error("Access denied")
            
            // 2.1 delete from s3 
            const result=  await s3Service.deleteObject(fileData.s3Key)
            if(!result)
                throw new Error(' Deleteing Failed ')

            //  3 delete file by id 
            const res = await fileRepo.destroy(data.fileId)
           
            return res;
        } catch (error) {
            console.log("Something went wrong in service layer (addFiles)", error );
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

}

const userservice = new userService()


module.exports = userservice;