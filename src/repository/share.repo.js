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
   


}


const shareRepo = new ShareRepo(); 

module.exports = shareRepo; 