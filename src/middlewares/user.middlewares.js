
const jwtHelper = require('../utlis/jwtHelper')
const {ClientErrorsCodes} = require('../utlis/Errors/https_codes')

class UserMiddleware {

   Login  (req, res, next) {
      if (!req.body.email || !req.body.password ) {
        console.log("Something went wrong in auth middleware");
        
        return res.status(ClientErrorsCodes.BAD_REQUEST).json({
          data: {},
          message: "Email or Password is missing  ",
          success: false,
        });
      }

      next();
    };

    Signup  (req, res, next) {
      if (!req.body.email || !req.body.password || !req.body.username ) {
        console.log("Something went wrong in auth middleware");
        
        return res.status(ClientErrorsCodes.BAD_REQUEST).json({
          data: {},
          message: "Email or Password or username is missing  ",
          success: false,
        });
      }

      next();
    };
    

    verifyRefreshToken  (req, res, next)  {

      try {

        
       const oldToken = req.cookies['refreshToken'];
       
        if (!oldToken ) {
            console.log("No refresh token is missing ");
            
            return res.status(ClientErrorsCodes.UNAUTHORISED).json({
            data: {},
            message: "refresh token is missing  ",
            success: false,
            });
        }

      next();
      } catch (error) {
           return res.status(ClientErrorsCodes.NOT_FOUND).json({
            message: "refresh token is missing ",
            success: false,
          });
          
      }

        
    };


    async  verifyToken  (req, res, next)  {

        const token = req?.headers['x-access-token'];
        
        if (!token ) {
            
            return res.status(ClientErrorsCodes.BAD_REQUEST).json({
            data: {},
            message: "token is missing   ",
            success: false,
            });
        }

        next();

    };


    async validateAcessToken(req,res, next){
       try {
             const token = req?.headers['x-access-token'];
             
            const response = await jwtHelper.verifyToken(token)

           
            
            if(!response) throw new Error(' Invalid Access Token  ')
            req.userId= response?.data?.id
           
            next();
            
            
            } catch (error) {
            return res.status(ClientErrorsCodes.UNAUTHORISED).json({
                data: {},
                message: "Invalid acess token or Token expired",
                success: false,
            });
            }
      }



}





const userMiddlewares = new  UserMiddleware()

module.exports = userMiddlewares; 
