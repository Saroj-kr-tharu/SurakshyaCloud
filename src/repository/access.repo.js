const CurdRepo = require("./curdRepo");
const  accessModel = require('../models/access')


class AccessRepo extends CurdRepo { 
    constructor(){
        super(accessModel)
    }; 

   


}


const accessRepo = new AccessRepo(); 

module.exports = accessRepo; 