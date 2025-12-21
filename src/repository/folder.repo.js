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

    async getFolderBydata(data) {
        try {
          
            const result = await folderModel
            .find({ownerId: data.userId, parentId: data.parentId})
            .select('_id name ownerId size parentId path isDeleted');
            return result;
        } catch (error) {
            console.log('Something went wrong in fileRepo (bulkCreate)');

            throw error;
        }
    } 

    async findByIdAndUpdateFolder(id, data, session=null) {
        try {
          
            const result = await folderModel
                .findByIdAndUpdate(id,data,  { new: true, session })
                .select("parentId");
            return result;
        } catch (error) {
            console.log('Something went wrong in fileRepo (findByIdAndUpdateFolder)');

            throw error;
        }
    }

    async updateManyfolder(filter, update, options = {}) {
        try { 
          
            const result = await folderModel.updateMany(
                filter,
                update,
                options
            );
            return result;
        } catch (error) {
            console.log('Something went wrong in FolderRepo (updateManyfolder)');

            throw error;
        }
    }

    async deleteManyfolder(filter,  options = {}) {
        try { 
          
            const result = await folderModel.deleteMany(
                filter,
                options
            );
            console.log('result => ', result )
            return result;
        } catch (error) {
            console.log('Something went wrong in FolderRepo (deleteManyfolder)');

            throw error;
        }
    }

    async findManyFolder(userId, folderIds) {
        try { 
          
            const result = await folderModel.find({
                    _id: { $in: folderIds },
                    ownerId: userId,
                });
            return result;
        } catch (error) {
            console.log('Something went wrong in FolderRepo (deleteManyfolder)');

            throw error;
        }
    }



}


const folderRepo = new FolderRepo(); 

module.exports = folderRepo; 