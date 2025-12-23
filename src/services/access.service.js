const curdService = require("./curdService");
const {accessRepo} = require('../repository/index')
const mongoose = require('mongoose')



class AccessService extends curdService{

       constructor(){
        super(accessRepo) 
    }

    async createPrivateShareLink({ resourceType, resourceId, permission , ownerId, expiresAt = null }) { 
            try {
               // find user using email 
               const targetUser = await User.findOne({ email });

                if (!targetUser)  throw new Error('User not found'); 
               // create acess db 
               // 
               
                
                // return db 
                return {
                    publicShareLink: `${APP_URL}/share/${token}`
                };
            } catch (error) {
                console.log("Something went wrong in service layer (addFiles)", error );
                throw error;
            }
        }
    


}

const accessService = new AccessService()


module.exports = accessService;