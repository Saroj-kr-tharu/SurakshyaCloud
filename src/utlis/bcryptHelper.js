const bcrypt = require("bcrypt");

const { salt } = require("../config/serverConfig");

class Bcrypt_helper_class {
  async checkPasswordService(plainpasword, hash) {
    try {
      
      // console.log('data => ', plainpasword, hash)
      const match = bcrypt.compareSync(plainpasword, hash);
      if (!match) 
          throw new Error( `Creditals invlaid`);
     
      return match;
    } catch (error) {
        console.log( "Something went wrong in bcrypt helper layer (checkPasswordService)");
        throw new Error('Issue in verify Creaditials  in bcryptHelper in  Bcrypt_helper_class function ');
      }
  }

  
}

const bcryptHelper = new Bcrypt_helper_class();

module.exports = bcryptHelper;
