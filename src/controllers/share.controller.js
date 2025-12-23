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
    async createPrivateShare(req,res ) {
        try {
            
            const { resourceType, resourceId, permission, expiresAt } = req.body;
            const ownerId = req.userId;
            const email = req?.email; 
            const payload = { resourceType, resourceId, permission, ownerId, email };

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
 

}



const shareController = new ShareController();

module.exports = shareController;