const CurdRepo = require("./curdRepo");
const  fileModel = require('../models/file')


class FileRepo extends CurdRepo { 
    constructor(){
        super(fileModel)
    }; 

    async bulkCreate(data, session = null) {
        try {
            const options = {};
            if (session) options.session = session;
            const result = await fileModel.insertMany(data, options);
            return result;
        } catch (error) {
            console.log('Something went wrong in fileRepo (bulkCreate)');

            throw error;
        }
    } 


    async getFiles(data) {
        try { 
            const result = await fileModel
            .find({ownerId: data.userId,  folderId: data.folderId})
            .select('_id ownerId folderId originalName s3Key mimeType  size  status isPublic  downloadCount' );
            return result;
        } catch (error) {
            console.log('Something went wrong in fileRepo (getFiles)');

            throw error;
        }
    } 

    async findOneFiles(filter) {
        try { 
            const result = await fileModel
            .findOne(filter)
            .select('_id ownerId folderId originalName s3Key mimeType  size  status isPublic  downloadCount' );
            return result;
        } catch (error) {
            console.log('Something went wrong in fileRepo (findOneFiles)');

            throw error;
        }
    } 


}


const fileRepo = new FileRepo(); 

module.exports = fileRepo; 