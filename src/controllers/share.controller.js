const {shareService, accessService} = require('../services/index');
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')


class ShareController { 

    // public 
    async createPublicShare(req,res ) {
        try {
            
            const { resourceType, resourceId, permission, expiresAt } = req.body;
            const ownerId = req.userId;

            const payload = { resourceType, resourceId, permission, ownerId };

            if (expiresAt) {
                payload.expiresAt = expiresAt;
            }

            const response = await shareService.createPublicShareLink(payload);

            return res.status(SucessCode.OK).json({
                message: "Successfully  createPublicShare",
                success: true, 
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (createPublicShare) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    async getAllPublicShare(req,res ) {
        try {           
            const ownerId = req.userId;

            const response = await shareService.getAllPublicShareLink({ownerId});

            return res.status(SucessCode.OK).json({
                message: "Successfully  getAllPublicShare",
                success: true, 
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (getAllPublicShare) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async bulkDeleteShare(req,res ) {
        try {           
            const ownerId = req.userId;
            const linkIds = req?.body?.links; 
            const response = await shareService.bulkDeleteSharelink({ownerId, linkIds});

            return res.status(SucessCode.OK).json({
                message: "Successfully  bulkDeleteShare",
                success: true, 
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (bulkDeleteShare) ", error )
            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async openShareLink(req,res ) {
        try {
            
            
            const token = req?.params?.token;            
            const  response = await shareService.openShareLink(token, res);

            return res.status(SucessCode.OK).json({
                message: "Successfully  viewFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (viewFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async getFileShareLink(req,res ) {
        try {
            
            const token = req?.params?.token;            
            const fileId = req?.params?.fileId;           
            const folderId = req?.body?.folderId;  
            const  response = await shareService.openFileOfFolder(token, fileId,folderId, res);

            return res.status(SucessCode.OK).json({
                message: "Successfully  viewFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (viewFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    // private 
    async grantAccess(req,res ) {
        try {
            
            const { resourceType, resourceId, permission } = req.body;
            const ownerId = req.userId;
            const email = req?.body?.email;
            const response = await accessService.grantAcess({ resourceType, resourceId, permission, email, ownerId});

            return res.status(SucessCode.OK).json({
                message: "Successfully  grantAccess",
                success: true, 
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (grantAccess) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    
     async getAllAccessByEmail(req,res ) {
        try {
            
            const userId = req.userId;
            
            const response = await accessService.getAllAcessItems({   userId});

            return res.status(SucessCode.OK).json({
                message: "Successfully  getAllAccessByEmail",
                success: true, 
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (getAllAccessByEmail) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


     async getAccessItems(req,res ) {
        try {
            
            const userId = req.userId;
            const resourceId = req?.params?.item;
            const rootPath = req?.body?.rootPath || null ; 
            const response = await accessService.getItems({userId, resourceId, rootPath})

            return res.status(SucessCode.OK).json({
                message: "Successfully  getAccessItems",
                success: true, 
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in ShareController  level  (getAllAccessByEmail) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

}



const shareController = new ShareController();

module.exports = shareController;