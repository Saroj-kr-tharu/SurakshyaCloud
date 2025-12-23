const curdService = require("./curdService");
const {accessRepo} = require('../repository/index')
const userservice = require("./user.service");
const  fileService  = require("./file.service");
const folderservice = require("./folder.service");
const s3service = require("./s3.service");




class AccessService extends curdService{

       constructor(){
        super(accessRepo) 
    }

    async grantAcess({ resourceType, resourceId, permission, email, ownerId }) { 
            try {
                // validate resource 
                resourceType = String(resourceType).toLowerCase();
                if (resourceType !== 'file' && resourceType !== 'folder')
                    throw new Error(' Resource Type Must be File or Folder ');
    
                // check oweneId if the resourceid is access by owner or not 
                    let result;  
                    if(resourceType === 'file') 
                        result = await fileService.detailFile({userId: ownerId, fileId: resourceId})
                    if (resourceType === 'folder')
                        result = await folderservice.detailFolder({userId: ownerId, folderId: resourceId})
    
                    if(!result) throw new Error(" Owner Have not Access To Resources ")

               // find user using email 
               const targetUser = await userservice.getByEmail( email );
               
               if (!targetUser)  throw new Error('User not found'); 

               // create acess db 
               const res =  await accessRepo.create({
                    resourceType,
                    resourceId,
                    userId: targetUser._id,
                    permission
                });
            
                if(!res) throw new Error('Already Have Accessed ')
                    
                
                // return db 
                return {
                    email, 
                    resourceType, 
                    resourceId,

                };
            } catch (error) {
                console.log("Something went wrong in service layer (grantAcess)", error );
                throw error;
            }
    }
    
     async getAllAcessItems({ userId }) { 
            try {
              const res = await accessRepo.getByUserId(userId)
              return res ;
            } catch (error) {
                console.log("Something went wrong in service layer (getAllAcessItems)", error );
                throw error;
            }
    }

     async getItems({ userId, resourceId, rootPath =null  }) { 
            try {
                if(rootPath){
                    const file = await fileService.getByidService(resourceId);
                    if(!file) throw new Error("Access Denid")
                    
                    const  folder = await folderservice.getByidService(file.folderId);
                    if(!folder) throw new Error(" Access Denid");   

                   if (!folder.path.startsWith(rootPath)) {
                        throw new Error("Access Denid");
                    }

                    const signedUrl =  await  s3service.pullObject({s3Key : file.s3Key} )
                    return signedUrl;

                }

                // check resource is available with user id or not 
                const data = await accessRepo.findoneByFilter({userId, resourceId})
                if(!data ) throw new Error("Access Denied")

                if(data.resourceType.toLowerCase() === 'file'){
                    const file = await fileService.getByidService(data.resourceId);
                    if(!file) throw new Error("File is not Found")
                    const signedUrl =  await  s3service.pullObject({s3Key : file.s3Key} )
                    return signedUrl; 
                }
                else if (data.resourceType.toLowerCase() === 'folder'){
                    const  folder = await folderservice.getByidService(data.resourceId);
                    if(!folder) throw new Error(" Folder is not found ");
                    const rootPath = folder.path;

                    const res = await folderservice.getAllFolderWithFiles({folderId:folder._id, userId:folder.ownerId})
                    // console.log("res => ", res )
                    return {
                        rootpath:rootPath,
                        ...res, 
                    }; 
                }

             
            } catch (error) {
                console.log("Something went wrong in service layer (getItems)", error );
                throw error;
            }
    }


}

const accessService = new AccessService()


module.exports = accessService;