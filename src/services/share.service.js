const mongoose = require('mongoose');

const {APP_URL} = require('../config/serverConfig')

const {GenerateShareToken} = require('../utlis/cryptoHelper')

const curdService = require("./curdService");
const {shareRepo,fileRepo } = require('../repository/index')
const fileService = require('./file.service')
const folderservice = require("./folder.service");
const s3Service = require("./s3.service");

class ShareService extends curdService{

    constructor(){
         super(shareRepo) 
     }

    async createPublicShareLink({ resourceType, resourceId, permission , ownerId, expiresAt = null }) { 
        try {
            // check the resource is exist or not and check type it is file or folder 
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

            // generate token 
            const token = GenerateShareToken(); 
 
            // create in share db 
            await shareRepo.create({
                resourceType,
                resourceId,
                ownerId,
                token,
                permission,
                expiresAt
            })

           
            
            // return db 
            return {
                publicShareLink: `${APP_URL}/share/${token}`
            };
        } catch (error) {
            console.log("Something went wrong in service layer (addFiles)", error );
            throw error;
        }
    }

    async validateShareLink(token) { 
        try {
            // get data by token 
            const data = await shareRepo.getByToken(token);
            if(!data) throw new Error(' Invalid Share Link  ')
            
            if (data.expiresAt && data.expiresAt < new Date()) 
                throw new Error('Share link expired');
            return data; 

        } catch (error) {
            console.log("Something went wrong in service layer (validateShareLink)", error );
            throw error;
        }
    }

    async openShareLink(token, res) { 
        try {
            // validate token 
            const share = await this.validateShareLink(token)
            
            if (share.resourceType === 'file') { 
                const file = await fileService.getByidService(share.resourceId);
                const signedUrl =  await  s3Service.pullObject({s3Key : file.s3Key} )

               res.redirect(signedUrl); 
            }

            if (share.resourceType === 'folder') {
                const subfolders = await folderservice.getAllFolderWithFiles({folderId:share.resourceId, userId:share.ownerId});
                return subfolders;
            }


        } catch (error) {
            console.log("Something went wrong in service layer (openShareLink)", error );
            throw error;
        }
    }


     async openFileOfFolder(token,fileId, folderId ,res) { 
        try {
          // check the token is valid or not 
            const share = await this.validateShareLink(token)
          // check the token is for folder 
            if (share.resourceType !== 'folder') throw new Error(' Acess Denied ')

         
          // check the file is present in that folder or not 
           if (!mongoose.Types.ObjectId.isValid(fileId)) throw new Error("Access Denied"); 

           const file = await fileRepo.findOneFiles({_id: fileId, folderId});
           if(!file) throw new Error(" Access Denied ")
          // generate cdn url and return 
            const signedUrl =  await  s3Service.pullObject({s3Key : file.s3Key} )
            return signedUrl;

        } catch (error) {
            console.log("Something went wrong in service layer (openFileOfFolder)", error );
            throw error;
        }
    }



}

const shareService = new ShareService()


module.exports = shareService;