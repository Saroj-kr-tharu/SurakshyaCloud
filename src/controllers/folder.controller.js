const {  folderService} = require('../services/index');
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')


class FolderController { 

    async addFolder(req,res) {
        try {
            
            const {name, parentId} = req?.body; 
            const userId = req?.userId; 

             if (!name || name.trim() === '') {
               throw new Error('Folder name required')
            }
           
            const response = await folderService.generateFolder({name, parentId, userId}) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully to addFolder",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (addFolder) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error,
            });
        }
    }
    
    
    // async viewFile(req,res ) {
    //     try {
            
           
    //         const userId = req?.userId; 
    //         const fileId = req?.params?.fileId;            
    //         const  response = await fileService.viewsFiles({userId, fileId }) ;

    //         return res.status(SucessCode.OK).json({
    //             message: "Successfully  viewFile",
    //             success: true,
    //             data: response,
    //             err: {},
    //         });

    //     } catch (error) {
    //         console.log("something went wrong in controller  level  (viewFile) ", error )

    //         return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
    //             message: error.message,
    //             sucess: false,
    //             data: {},
    //             err: error.explanation,
    //         });
    //     }
    // }


    // async deleteFile(req,res ) {
    //     try {
             
           
    //         const userId = req?.userId; 
    //         const fileId = req?.query?.fileId;            
    //         const  response = await fileService.deleteFile({userId, fileId}) ;

    //         return res.status(SucessCode.OK).json({
    //             message: "Successfully  deleteFile",
    //             success: true,
    //             data: response,
    //             err: {},
    //         });

    //     } catch (error) {
    //         console.log("something went wrong in controller  level  (deleteFile) ", error )

    //         return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
    //             message: error.message,
    //             sucess: false,
    //             data: {},
    //             err: error,
    //         });
    //     }
    // }


}



const folderController = new FolderController();

module.exports = folderController;