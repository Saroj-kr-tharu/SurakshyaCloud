
const jwt = require('jsonwebtoken');
const { PRIVATE_JWT, PRIVATEJWTRefersh } = require("../config/serverConfig");

class JWT {

  async createToken(data, time= '20m') {
    try {

        // console.log('data => ', data, ' time => ', time, " secrect => ", PRIVATE_JWT)
      const token = await jwt.sign({ data }, PRIVATE_JWT, {
        expiresIn: time, 
      });

      

      return token;
    } catch (error) {
      console.log("Something went wrong in service layer (creating the token)", error);
      throw new Error('Issue in verify Creaditials  in bcryptHelper in  Bcrypt_helper_class function ');
    }
  }


   async createRefreshToken(data, time= '7d') {
    try {

      // console.log('data => ', data, ' time => ', time, " secrect => ", PRIVATEJWTRefersh)
      const token = await jwt.sign({ data }, PRIVATEJWTRefersh, {
        expiresIn: time, 
      });

      return token;
    } catch (error) {
      console.log("Something went wrong in service layer (creating the createRefreshToken)");
      throw error ;
    }
  }


  async verifyToken(token ) {
    try {
      const response = jwt.verify(token, PRIVATE_JWT);
      if (!response) throw new Error("Invalid Token  ");

      return response;
    } catch (error) {
        console.log("Something went wrong in service layer (verify token)", error );
        throw error; 
    }
  }


  async verifyRefreshToken(token ) {
    try {
      const response = jwt.verify(token, PRIVATEJWTRefersh);
     if (!response) throw new Error("Invalid Token  ")
      

      return response;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        console.log("Token has expired");
        throw { error: "TokenExpiredError", message: "Token has expired" };
      } else {
        console.log("Something went wrong in service layer (verify token)");
        throw  error;
      }
    }
  }
}

const jwt_helper = new JWT();

module.exports =  jwt_helper ;
