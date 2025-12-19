const {fileService} = require('../services/index');
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')


class FileController { 

    async addFile(req,res) {
        try {
            
            const fileData = req?.file; 
            const userId = req?.userId; 
          
            console.log('from controller data => ', fileData)
            
            const data = {
                ownerId:userId,
                originalName:fileData.originalname,
                s3Key:fileData.key,
                mimeType:fileData.mimetype,
                size:fileData.size
            }

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
                err: error.explanation,
            });
        }
    }
    
    
    async viewFile(req,res ) {
        try {
            
           
            const userId = req?.userId; 
            const fileId = req?.params?.fileId; 
            const {mode} = req?.query;
           

            let response; 
            if(mode== "preview")
                 response = await fileService.viewsFiles({userId, fileId, mode }) ;
            if(mode== "download")
             response = await fileService.viewsFiles({userId, fileId, mode }) ;

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


}



const fileController = new FileController();

module.exports = fileController;