const CurdRepo = require("./curdRepo");
const  folderModel = require('../models/folder')
const mongoose = require('mongoose')


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

    async getAllSubFolders(folderId, ownerId) {
        try {
            const result = await folderModel.aggregate([
            {
                $match: {
                _id: new mongoose.Types.ObjectId(folderId),
                ownerId: new mongoose.Types.ObjectId(ownerId),
                isDeleted: false
                }
            },
            {
                $graphLookup: {
                from: 'folders',          // collection name
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parentId',
                as: 'subFolders',
                restrictSearchWithMatch: {
                    isDeleted: false
                }
                }
            }
            ]);
          
            return result[0]?.subFolders || [];
        } catch (error) {
            console.log('Something went wrong in getAllSubFolders');
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