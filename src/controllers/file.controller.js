const {fileService, s3Service} = require('../services/index');
const s3service = require('../services/s3.service');
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')


class FileController { 

    async addFile(req,res) {
        try {
            

            // 1. check the file length , if single then file , or files[]
            const files = req.files?.length
                ? req.files
                : req.file
                ? [req.file]
                : [];

                // console.log('files => ', files)
            //2. check length
            if (files.length === 0) 
                throw new Error('No files uploaded' )
            
            //3. get userId
            const userId = req?.userId;
            const folderId = req?.body?.folderId; 
            const data = {userId, files, folderId: folderId || null }
            

            const response = await fileService.addFiles(data) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully to addFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error,
            });
        }
    }
    
    
    async viewFile(req,res ) {
        try {
            
           
            const userId = req?.userId; 
            const fileId = req?.params?.fileId;            
            const  response = await fileService.viewsFiles({userId, fileId }) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  viewFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (viewFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async deleteFile(req,res ) {
        try {
             
           
            const userId = req?.userId; 
            const fileId = req?.query?.fileId;            
            const  response = await fileService.deleteFile({userId, fileId}) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  deleteFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (deleteFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error,
            });
        }
    }

    async renameFile(req,res ) {
        try {
             
           
            const userId = req?.userId; 
            const fileId = req?.params?.fileId;  
            const name = req?.body?.name;            
            const  response = await fileService.renameFile({userId, fileId, name}) ; 

            return res.status(SucessCode.OK).json({
                message: "Successfully  renameFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (renameFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error,
            });
        }
    }

     async detailsFile(req,res ) {
        try {
            
           
            const userId = req?.userId; 
            const fileId = req?.params?.fileId;            
            const  response = await fileService.detailFile({userId, fileId }) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  detailsFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (detailsFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

      async moveFile(req,res ) {
        try {
            
           
            const userId = req?.userId; 
            const fileId = req?.params?.fileId;     
            const targetFolderId = req?.body?.targetFolderId;       
            const  response = await fileService.moveFile({userId ,fileId, targetFolderId}) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  moveFile",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (moveFile) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

}



const fileController = new FileController();

module.exports = fileController;