const curdService = require("./curdService");
const {folderRepo, fileRepo} = require('../repository/index');
const { default: mongoose } = require("mongoose");
const fileService = require('./file.service')


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

    

}

const folderservice = new folderService()


module.exports = folderservice;