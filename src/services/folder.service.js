const curdService = require("./curdService");
const {folderRepo, fileRepo} = require('../repository/index');
const userMiddlewares = require("../middlewares/user.middlewares");


class folderService extends curdService{

    constructor(){
        super(folderRepo) 
    }

    async generateFolder({name, parentId, userId}) {  
        try {
            let path = `${name}`; 

            // 1. find parent folder if folder = null then it should be root
             if(parentId)  {
                // 
                const fol_res = await folderRepo.findFolder({_id: parentId, ownerId:userId, isDeleted:false});
                console.log('res => ', fol_res, parentId)
                path = `${fol_res.path}/${name}`;
             }
            
            // 3. check path is already exists 
            const exist = await folderRepo.findFolder({ownerId: userId, parentId: parentId || null, name, isDeleted:false }) 
            if(exist) 
                throw new Error(' Folder is Already exist in same path ')

            //4. create folder now 
            const res = await folderRepo.create({
                name, ownerId:userId, parentId: parentId || null, path 
            })
            return res; 
            
        } catch (error) {
            console.log("Something went wrong in service layer (generateFolder)", error );
            throw error;
        }
    }


    async viewRootFolder({ userId,parentId=null,folderId=null   }) {  
        try {
             // 1. get all the folder of user which parentId = null 
               const folders = await folderRepo.getFolderBydata({userId, parentId })
               // 2. get all the file of user which folderId = null 
               const files = await fileRepo.getFiles({userId, folderId})
               // 3. return folder , file (originalName)
               const res = { 
                folders, 
                files
               }
               return res ;
            
        } catch (error) {
            console.log("Something went wrong in service layer (viewRootFolder)", error );
            throw error;
        }
    }


    async viewFolder({ userId, folderId=null   }) {  
        try {
             // 1. get all the folder of user which parentId = null 
               const folders = await folderRepo.getFolderBydata({userId, parentId:folderId })
               // 2. get all the file of user which folderId = null 
               const files = await fileRepo.getFiles({userId, folderId})
               // 3. return folder , file (originalName)
               const res = { 
                folders, 
                files
               }
               return res ;
            
        } catch (error) {
            console.log("Something went wrong in service layer (viewRootFolder)", error );
            throw error;
        }
    }




}

const folderservice = new folderService()


module.exports = folderservice;