const CurdRepo = require("./curdRepo");
const  fileModel = require('../models/file')


class FileRepo extends CurdRepo { 
    constructor(){
        super(fileModel)
    }; 

    async bulkCreate(data) {
        try {
            const result = await fileModel.insertMany(data);
            return result;
        } catch (error) {
            console.log('Something went wrong in fileRepo (bulkCreate)');

            throw error;
        }
    } 


}


const fileRepo = new FileRepo(); 

module.exports = fileRepo; 