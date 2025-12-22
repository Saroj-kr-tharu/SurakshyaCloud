const {  folderService} = require('../services/index');
const itemsservice = require('../services/items.service');
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')


class ItemsController { 

    async deleteItems(req,res ) {
        try {
            
            const userId = req?.userId;
            const {folders} = req?.body;   
            const {files} = req?.body;   


           if ( (!Array.isArray(folders) || folders.length === 0) && (!Array.isArray(files) || files.length === 0) ) 
            throw new Error("At least one of folders or files must be a non-empty array");
        
            const  response = await itemsservice.deleteItems(userId, folders, files) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  deleteItems",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (viewFolder) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

    async moveItems(req,res ) {
        try {
            
            const userId = req?.userId;
            const {folders} = req?.body;   
            const {files} = req?.body;   
            const {targetFolderId} = req?.body;   


           if ( (!Array.isArray(folders) || folders.length === 0) && (!Array.isArray(files) || files.length === 0) ) 
            throw new Error("At least one of folders or files must be a non-empty array");
        
            const  response = await itemsservice.moveItems({userId, files,  folders, targetFolderId}) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  moveItems",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (moveItems) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }

}



const itemsController = new ItemsController();

module.exports = itemsController;