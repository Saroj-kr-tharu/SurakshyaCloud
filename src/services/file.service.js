const curdService = require("./curdService");
const {fileRepo, userRepo} = require('../repository/index')
const { CLOUDFLARE_CDN_UR } = require("../config/serverConfig");

const {getFileSignedUrl} = require('../utlis/multerHelper')

class userService extends curdService{

       constructor(){
        super(fileRepo)
    }

    async addFiles(data) {
        try {
            

            // 1. add  file 
            const res = await fileRepo.create( {...data} );

            // 2. update the storage in user model 
            await userRepo.update(data.ownerId,  { $inc: { storageUsed: data.size } } )
            return res;
        } catch (error) {
            console.log("Something went wrong in service layer (addFiles)", error );
            throw error;
        }
    }


    async viewsFiles(data) {
        try {
            //1. get data from the database using file id findOne,
            const fileData= await fileRepo.get(data.fileId);
          
            if(!fileData) throw new Error(" File is not Found ")
            // 2. check ownership
            if (fileData.ownerId.toString() !== data.userId) 
                    throw new Error("Access denied")
                
            //  2.1 if mode == download then increase the downloadcount +1 ;
                await fileRepo.update(fileData._id.toString(), { $inc: { downloadCount: 1 } } )

            // 3. generate signedurl 
            const signedUrl =  await  getFileSignedUrl({s3Key : fileData.s3Key,mode: data.mode,originalName: fileData.originalName} )
            
            // 4.return signed url 
            const res = {
                signedUrl, 
                originalName: fileData.originalName, 
            }

           
            return res;
        } catch (error) {
            console.log("Something went wrong in service layer (addFiles)", error );
            throw error;
        }
    }


}

const userservice = new userService()


module.exports = userservice;