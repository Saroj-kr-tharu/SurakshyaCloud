const curdService = require("./curdService");
const {folderRepo, fileRepo} = require('../repository/index');
const { default: mongoose } = require("mongoose");
const fileService = require('./file.service')
const s3Service = require('./s3.service')


class folderService extends curdService{

    constructor(){
        super(folderRepo) 
    }

    async generateFolder({name, parentId, userId}) {  
        try {
            let path = `${name}`; 

            // 1. find parent folder if folder = null then it should be root
             if(parentId)  {
                // 
                const fol_res = await folderRepo.findFolder({_id: parentId, ownerId:userId, isDeleted:false});
                console.log('res => ', fol_res, parentId)
                path = `${fol_res.path}/${name}`;
             }
            
            // 3. check path is already exists 
            const exist = await folderRepo.findFolder({ownerId: userId, parentId: parentId || null, name, isDeleted:false }) 
            if(exist) 
                throw new Error(' Folder is Already exist in same path ')

            //4. create folder now 
            const res = await folderRepo.create({
                name, ownerId:userId, parentId: parentId || null, path 
            })
            return res; 
            
        } catch (error) {
            console.log("Something went wrong in service layer (generateFolder)", error );
            throw error;
        }
    }


    async viewRootFolder({ userId,parentId=null,folderId=null   }) {  
        try {
             // 1. get all the folder of user which parentId = null 
               const folders = await folderRepo.getFolderBydata({userId, parentId })
               // 2. get all the file of user which folderId = null 
               const files = await fileRepo.getFiles({userId, folderId})
               // 3. return folder , file (originalName)
               const res = { 
                folders, 
                files
               }
               return res ;
            
        } catch (error) {
            console.log("Something went wrong in service layer (viewRootFolder)", error );
            throw error;
        }
    }


    async viewFolder({ userId, folderId=null   }) {  
        try {
             // 1. get all the folder of user which parentId = null 
               const folders = await folderRepo.getFolderBydata({userId, parentId:folderId })
               // 2. get all the file of user which folderId = null 
               const files = await fileRepo.getFiles({userId, folderId})
               // 3. return folder , file (originalName)
               const res = { 
                folders, 
                files
               }
               return res ;
            
        } catch (error) {
            console.log("Something went wrong in service layer (viewRootFolder)", error );
            throw error;
        }
    }



    async detailFolder({ userId, folderId=null   }) {  
        try {
          // 1. get folder 
         const folderData = await folderRepo.get(folderId);
         
        if(!folderData) throw new Error(" Folder is not Found ")

        // 2. check ownership
        if (folderData.ownerId.toString() !== userId) 
            throw new Error("Access denied")

        // get all the subdirectories 
        const subfolder =  await this.viewFolder({userId,folderId})
        const totalFolder = subfolder.folders.length;
        const totalFiles = subfolder.files.length;

        return { 
            totalFolder,
            totalFiles, 
            folderData
        };
            
        } catch (error) {
            console.log("Something went wrong in service layer (dertailFolder)", error );
            throw error;
        }
    }


    async moveFolder({ userId,  folderId, targetFolderId   }) {  
        const session = await mongoose.startSession();
        session.startTransaction()
        try {
            
            // 1. check the folder is exist
            const folderData = await folderRepo.get(folderId);
                if(!folderData) throw new Error(" Folder is not Found ")

            // 1.2 check the owner acess 
            if (folderData.ownerId.toString() !== userId) 
                    throw new Error("Access denied")

            //1.3 check the target folder is exis ro not or if it is null = root 
            let targetFolder = null;
            if (targetFolderId) {
                targetFolder = await folderRepo.get(targetFolderId, session);
                if (!targetFolder) throw new Error("Target folder not found");
            }

            //1.4  update the path of both the new and old folder 
            const oldPath = folderData.path;
            const newPath = targetFolder
                ? `${targetFolder.path}/${folderData.name}`
                : folderData.name;

            // 1.5 cannot move into own folder 
            if (targetFolder && targetFolder.path.startsWith(oldPath)) 
                throw new Error("Cannot move folder into its own subtree");
        

            // 2 subtract full sub tree from old parents  
            if (folderData.parentId) {
                await fileService.propagateFolderSize(
                    folderData.parentId,
                    -folderData.size,
                    session
                );
            }

            // 3 chage parent and upate the path 
            await folderRepo.update(
                folderId,
                { parentId: targetFolderId,   path: newPath },
                 session 
            );

            // console.log('old path  => ', oldPath, " new path => ", newPath, )

            // 3.1 update paths of all descendants
            await folderRepo.updateManyfolder(
                {   ownerId: userId,
                    path: { $regex: `^${oldPath}/` }
                },
                [
                    {
                        $set: {
                            path: {
                                $replaceOne: {
                                    input: "$path",
                                    find: oldPath,
                                    replacement: newPath
                                }
                            }
                        }
                    }
                ],
                { session, updatePipeline: true }
            );

            
            // 4. add full subtree to new parents 
            if (targetFolderId) {
                await fileService.propagateFolderSize(
                    targetFolderId,
                    folderData.size,
                    session
                );
            }

            await session.commitTransaction();
            session.endSession();

            return {
                targetFolderId , 
                oldFolderName: folderData.name
            }
            
        } catch (error) {
            await session.abortTransaction();
            session.endSession(); 
            console.log("Something went wrong in service layer (moveFolder)", error );
            throw error;
        }
    }

    async deleteManyFolder({ userId, folderIds  }, session=null) {  
        try {

                // 1. check folders is exist or not 
                const foldersData = await folderRepo.findManyFolder(userId, folderIds)

                // 2. verify the ownership of the folders with user 
                if(foldersData.length !== folderIds.length) 
                    throw new Error(" One of folders are  not accessible ")
                
                //3 find all the files of selected folders  and perfom delete 
                const files = await fileRepo.findManyFiles( {   folderId: { $in: folderIds },})
                
                // 4 delete all files from db 
                const totalFiles =  await fileRepo.deleteManyFiles({ folderId:  { $in: folderIds } }, session);
                
                // 5 delete sub folders
                    // get all subfolders
                    const subfoldersId = [];
                    const allSubFolders = await Promise.all(
                    folderIds.map(folderId =>
                        folderRepo.getAllSubFolders(folderId, userId)
                        )
                    );

                    allSubFolders.forEach(subfolders => {
                        subfolders.forEach(folder => {
                            subfoldersId.push(folder._id.toString());
                        });
                    });

                let TotaldeletesubFolder; 
                if(subfoldersId.length > 0){
                    TotaldeletesubFolder =  await folderRepo.deleteManyfolder({ _id: { $in: subfoldersId } }, session);

                    //delete all the files under subfolders 
                     await fileRepo.deleteManyFiles({ folderId:  { $in: subfoldersId } }, session);
                }
                   

                // 6 delete all folder
                await folderRepo.deleteManyfolder({ _id: { $in: folderIds } }, session);

                // 7 delete from s3 
                    // 1.3.1 make list of s3key 
                    const objects3 = files.map(item => ({
                        Key: item.s3Key
                    }));

                    if(objects3.length != 0 )
                        await s3Service.bulkdeleteObject(objects3);
                    
            

                // 8. update the size of folder and check if it is root folder 
                 // calculate the totalSize 
                 const isRoot = foldersData.every(folder => !folder.parentId);
                 if(isRoot == false){
                     const totalFolderSize = foldersData.reduce( (acc, folder) => acc + folder.size, 0 );
                     await fileService.propagateFolderSize(foldersData[0].parentId, -totalFolderSize, session)
                 }

                 return { 
                    totalFolder: folderIds.length,
                    totalSubfolderdelte : TotaldeletesubFolder || 0, 
                    totalfiles: totalFiles.length || 0 
                 }
                 
            
        } catch (error) {
            console.log("Something went wrong in service layer (deleteManyFolder)", error );
            throw error;
        }
    }

    async deleteItems( userId, folderIds=[], filesIds=[] ) {  

        const session = await mongoose.startSession();
        session.startTransaction()
        try {
            let FilesResult ; 
            let FolderResult; 

            // 1.0 delete first file    
            if(filesIds.length !== 0 ){
               FilesResult =  await  fileService.deleteManyFile(filesIds, userId, session) ;
                }
            
            // 2.0 delete folders 
            if(folderIds.length !==0 ){
              FolderResult= await this.deleteManyFolder( {userId, folderIds} , session) ;
            }

            // 6.commit the transaction 
            await session.commitTransaction();
            session.endSession();
            return {
                FilesResult, 
                FolderResult
            } ; 
        } catch (error) {
            await session.abortTransaction();
            session.endSession(); 
            console.log("Something went wrong in service layer (deleteFolder)", error );
            throw error;
        }
    }


}

const folderservice = new folderService()


module.exports = folderservice;