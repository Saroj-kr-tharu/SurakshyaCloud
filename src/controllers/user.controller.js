const {userService} = require('../services/index');
const {SucessCode, ServerErrosCodes} = require('../utlis/Errors/https_codes')

class AuthController { 

    async signup(req,res) {
        try {
            
            console.log('request => ', req.file)
            const data = req?.body;
            const response = await userService.createService(data) ;

            return res.status(SucessCode.OK).json({
                message: "Successfully to Signup",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (signup) ", error )

            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    
    async signin(req,res) {
        try {
            
            
            const data = req?.body;
            const response = await userService.loginService(data, res);
            
            return res.status(SucessCode.CREATED).json({
                message: "Successfully to login",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (signup) ", error )
            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }
    


    async veriyToken(req,res) {
        try {
            
            
            const token = req?.headers['x-access-token'];
            // console.log('token => ', token)
            const response = await userService.verifyToken(token);

            // console.log('response = > ', response)
            
            return res.status(SucessCode.OK).json({
                message: "Successfully to veify Token ",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (verifytoken) ")
            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


    async refreshToken(req,res) {
        try {
            
            
            const oldToken = req.cookies.refreshToken;
            const response = await userService.genRefreshToken(oldToken, res);
            
            return res.status(SucessCode.OK).json({
                message: "Successfully generate new Refresh Token",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (refreshToken) ")
            return res.status( ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error,
            });
        }
    }


      async logout(req,res) {
        try {
            
            
            const oldToken = req.cookies.refreshToken;
            console.log('olde Token => ', req.cookies)
            if(!oldToken){
                    return res.status(SucessCode.OK).json({
                    message: "Already Logout",
                    success: true,
                    data: {},
                    err: {},
                });
            }

            const response = await userService.logout(oldToken, res);
            
            return res.status(SucessCode.OK).json({
                message: "Successfully logout",
                success: true,
                data: response,
                err: {},
            });

        } catch (error) {
            console.log("something went wrong in controller  level  (logout) ")
            res.clearCookie("refreshToken");
            return res.status(error.statusCode  | ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
                sucess: false,
                data: {},
                err: error.explanation,
            });
        }
    }


}



const authController = new AuthController();

module.exports = authController;