
const mongoose = require('mongoose')
const { fileService, folderService } = require('./index');
const { folderRepo, fileRepo } = require('../repository');
const folderservice = require('./folder.service');



class itemsService {

    async deleteItems( userId, folderIds=[], filesIds=[] ) {  

        const session = await mongoose.startSession();
        session.startTransaction()
        try {
            let FilesResult ; 
            let FolderResult; 

            // 1.0 delete first file    
            if(filesIds.length !== 0 )
               FilesResult =  await  fileService.deleteManyFile(filesIds, userId, session) ;
                
            
            // 2.0 delete folders 
            if(folderIds.length !==0 )
              FolderResult= await folderService.deleteManyFolder( {userId, folderIds} , session) ;
            

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


   async moveItems({ userId, files = [], folders = [], targetFolderId = null }) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
          
            // 1. Validate target folder
            let targetFolder = null;

            if (targetFolderId) {
                targetFolder = await folderRepo.get(targetFolderId);
                if (!targetFolder) {
                    throw new Error("Target folder not found");
                }

                if (targetFolder.ownerId.toString() !== userId) {
                    throw new Error("Access denied to target folder");
                }
            }

            // 2. Bulk fetch source folders & files
            const folderDocs = folders.length ? await folderRepo.findManyFolder(userId, folders ) : [];

            const fileIds = files.map(f => f._id);

            const fileDocs = fileIds.length ? await fileRepo.findManyFiles({ _id: { $in: fileIds }, ownerId: userId  }) : [];

            
            // 3. Existence check
            if (folderDocs.length !== folders.length) 
                throw new Error("One or more folders not found or access denied");
            

            if (fileDocs.length !== fileIds.length) 
                throw new Error("One or more files not found or access denied");
            

            // 4. Validate same source parent
            let sourceParentId = undefined;

         

            for (const folder of folderDocs) {
                const parentId = folder.parentId
                    ? folder.parentId.toString()
                    : null;

                if (sourceParentId === undefined) {
                    sourceParentId = parentId;
                } else if (sourceParentId !== parentId) {
                    throw new Error("All items must be from the same folder");
                }
            
                // prevent moving into itself / subtree
                if (
                    targetFolder &&
                    (targetFolder._id.equals(folder._id) ||
                    targetFolder.path.startsWith(folder.path + "/"))
                ) throw new Error("Cannot move folder into itself or its subfolder");
                
            }

            // files
            for (const file of fileDocs) {
                const parentId = file.folderId
                    ? file.folderId.toString()
                    : null;

                if (sourceParentId === undefined) {
                    sourceParentId = parentId;
                } else if (sourceParentId !== parentId) {
                    throw new Error("All items must be from the same folder");
                }
            }



            // 2. Move files
            for (const fileId of files) 
                await fileService.moveFile({ userId,  fileId, targetFolderId,  session });

            // 3. Move folders
            for (const folderId of folders) 
                await folderService.moveFolder({ userId, folderId, targetFolderId, session });
            
            

            await session.commitTransaction();
            session.endSession();

            return {
                message: "Items moved successfully",
                movedFiles: files.length,
                movedFolders: folders.length,
                targetFolderId
            };

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error("moveItems failed:", error);
            throw error;
        }
    }

    

}

const itemsservice = new itemsService()
module.exports = itemsservice;