const CurdRepo = require("./curdRepo");
const  userModel = require('../models/users')


class UserRepo extends CurdRepo { 
    constructor(){
        super(userModel)
    }; 

    async getByEmail(email) {
        try {
            const result = await userModel.findOne({email});
            return result;
        } catch (error) {
            console.log('Something went wrong in repo (create)');

            throw error;
        }
    } 


}


const userRepo = new UserRepo(); 

module.exports = userRepo; 