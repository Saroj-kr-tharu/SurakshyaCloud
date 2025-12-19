const curdService = require("./curdService");
const {folderRepo} = require('../repository/index')


class fileService extends curdService{

       constructor(){
        super(folderRepo)
    }

}

const fileservice = new fileService()


module.exports = fileservice;