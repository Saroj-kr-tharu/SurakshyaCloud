const CurdRepo = require("./curdRepo");
const  folderModel = require('../models/folder')


class FolderRepo extends CurdRepo { 
    constructor(){
        super(folderModel)
    }; 

   


}


const folderRepo = new FolderRepo(); 

module.exports = folderRepo; 