const curdService = require("./curdService");
const {userRepo} = require('../repository/index')
const bcryptHelper = require('../utlis/bcryptHelper')
const jwt_helper = require('../utlis/jwtHelper')

class userService extends curdService{

       constructor(){
        super(userRepo)
    }

    async getByEmail(email){
        try {
        
            const infoUser = await userRepo.getByEmail(email);
            return infoUser;
            

        } catch (error) {
            console.log("something went wrong in service curd level  (getByEmail) ")
            
             throw error;
           
        }
    }

    async loginService(data, res){
        try {
            const {password, email} = data;
            const infoUser = await userRepo.getByEmail(email);

            const hashpassword = infoUser?.password

            if(!hashpassword) throw new Error("Invalid Credentials")
                
                const isValid = await bcryptHelper.checkPasswordService(password, hashpassword );
                
                if (!isValid)  throw new Error("Invalid Credentials");
               


            // access token
            const token = await jwt_helper.createToken({...data, id: infoUser?._id,});
            
            
            // refresh token 
            const refreshToken = await jwt_helper.createRefreshToken(
                {email, id: infoUser?._id,  storageUsed: infoUser?.storageUsed,
                storageMax:infoUser?.storageMax,});

          
 
            // update refresh token in db 
            await userRepo.update(infoUser?._id, {refreshToken: refreshToken} );
             

            res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });

            const response = {
                email: data.email,
                id: infoUser?._id,
                role: infoUser?.role,
                username: infoUser?.username,
                jwt: token,
                storageUsed: infoUser?.storageUsed,
                storageMax:infoUser?.storageMax,
            }
            
            return response;
            

        } catch (error) {
            console.log("something went wrong in service curd level  (create) ")
            
             throw error;
           
        }
    }

    async verifyToken(data){
        try {
           
            const user = await jwt_helper.verifyToken(data);

             if (!user)
                throw new Error('Issue in verifying token in userService in  verifyToken function ');
               
            
            const infoUser = await userRepo.getByEmail(user.data.email);
           
            const response = {
                email: user.data.email,
                role: infoUser?.role,
                username: infoUser?.username,
                jwt: data,
                storageUsed:infoUser?.storageUsed,
                storageMax: infoUser?.storageMax,
            }
            
            return response;
            

        } catch (error) {
            console.log("something went wrong in service curd level  (verifyToken) ")
            throw  error;
        }
    }

    async genRefreshToken(data, res){
        try {
            
            const isvalid = await jwt_helper.verifyRefreshToken(data);
            console.log('from valid => ', isvalid)
            if(!isvalid) return 'invalid refresh token '
             if (!isvalid)
                throw new Error( 'Issue in verifying token in userService in  verifyToken function ',);
            
            const infoUser = await userRepo.getByEmail(isvalid.data.email); 
            
            if(!infoUser || infoUser?.refreshToken !== data) return 'invalid user or refresh token '

                
            const user = infoUser;
             // refresh token 
            const refreshToken = await jwt_helper.createRefreshToken({email: user.email, id: user.id,});
            // access token
            
            const token = await jwt_helper.createToken({email: user.email ,id: user.id,role: user.role, username:user.username});

            // update refresh token in db 
            await userRepo.update(user.id, {refreshToken: refreshToken} );

            res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });

        

            const response = {
                email: user.email,
                role: user.role,
                username: user.username,
                jwt: token,
            }

            
            return response;
            

        } catch (error) {
            console.log("something went wrong in service curd level  (genRefreshToken) ", error )
             throw  error
        }
    }

    async logout(data, res){
        try {
           
            const user = await jwt_helper.verifyRefreshToken(data);
            // console.log(user.data)

             if (!user)
                throw new Error('Issue in verifying token in userService in  verifyToken function ');

             // update refresh token in db 
            await userRepo.update(user.data.id, {refreshToken: null} );
            res.clearCookie("refreshToken");
               
            
            
            return `Log out user ${user.data.id} `;
            

        } catch (error) {
            console.log("something went wrong in service curd level  (verifyToken) ")
            throw  error;
        }
    }
   

 

 

}

const userservice = new userService()


module.exports = userservice;