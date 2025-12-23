const {  folderService} = require('../services/index');
const itemsservice = require('../services/items.service');
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
    
    
    async viewRootFolder(req,res ) {
        try {
            
           
            const userId = req?.userId;      
            const  response = await folderService.viewRootFolder({userId}) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  viewRootFolder",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (viewRootFolder) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async viewFolder(req,res ) {
        try {
            
           
            const userId = req?.userId;
            const parentId = req?.parentId;
            const folderId = req?.params?.folderId;   
              
            const  response = await folderService.viewFolder({userId,parentId: parentId || null , folderId}) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  viewFolder",
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

    


    async detailsFolder(req,res ) {
        try {
            
            const userId = req?.userId;
            const parentId = req?.parentId;
            const folderId = req?.params?.folderId;   
              
            const  response = await folderService.detailFolder({userId,parentId: parentId || null , folderId}) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully  viewFolder",
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
    
   





}



const folderController = new FolderController();

module.exports = folderController;