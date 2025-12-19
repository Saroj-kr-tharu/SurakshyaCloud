const CurdRepo = require("./curdRepo");
const  fileModel = require('../models/file')


class UserRepo extends CurdRepo { 
    constructor(){
        super(fileModel)
    }; 

    


}


const userRepo = new UserRepo(); 

module.exports = userRepo; 