const CurdRepo = require("./curdRepo");
const  folderModel = require('../models/folder')


class FolderRepo extends CurdRepo { 
    constructor(){
        super(folderModel)
    }; 

   async findFolder(data) {
        try {
            const result = await folderModel.findOne(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in fileRepo (bulkCreate)');

            throw error;
        }
    } 


}


const folderRepo = new FolderRepo(); 

module.exports = folderRepo; 