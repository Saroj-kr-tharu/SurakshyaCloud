const CurdRepo = require("./curdRepo");
const  shareModel = require('../models/share')


class ShareRepo extends CurdRepo { 
    constructor(){
        super(shareModel)
    }; 

    async getByToken(token) {
        try {
            const result = await shareModel.findOne({ token,  isActive: true });
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (getByToken)');

            throw error;
        }
    } 

    async getByUserId(ownerId) {
        try {
            const result = await shareModel.find({ ownerId });
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (getByUserId)');

            throw error;
        }
    } 

    async manyDelete(ownerId, linkIds) {
        try {
            const result = await shareModel.deleteMany({
                ownerId,
                _id: { $in: linkIds }
            });
             console.log('rsult => ', result, ownerId, linkIds)
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (manyDelete)');

            throw error;
        }
    }
   


}


const shareRepo = new ShareRepo(); 

module.exports = shareRepo; 