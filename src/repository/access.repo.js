const CurdRepo = require("./curdRepo");
const  accessModel = require('../models/access')


class AccessRepo extends CurdRepo { 
    constructor(){
        super(accessModel)
    }; 
 
   async getByUserId(userId) {
        try {
            const result = await accessModel.find({ userId });
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (getByUserId)');

            throw error;
        }
    } 

     async getByFileter(filter) {
        try {
            const result = await accessModel.find(filter);
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (getByFileter)');

            throw error;
        }
    } 

    async manyDelete( linkIds) {
            try {
                const result = await accessModel.deleteMany({
                    _id: { $in: linkIds }
                });
                return result;
            } catch (error) {
                console.log('Something went wrong in repo (manyDelete)');
    
                throw error;
            }
    }

    async findoneByFilter( filter) {
            try {
                const result = await accessModel.findOne(filter);
                return result;
            } catch (error) {
                console.log('Something went wrong in repo (findone)');
    
                throw error;
            }
    }


}


const accessRepo = new AccessRepo(); 

module.exports = accessRepo; 