const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

module.exports = { 
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),

  PRIVATE_JWT: process.env.PRIVATEJWT,
  PRIVATEJWTRefersh: process.env.PRIVATEJWTRefersh,

  
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESSKEYID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRECT_ACESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  BUCKET_NAME:  process.env.BUCKET_NAME,

  CLOUDFRONT_DOMAIN:  process.env.CLOUDFRONT_DOMAIN,
  CLOUDFRONT_PRIVATE_KEY:  process.env.CLOUDFRONT_PRIVATE_KEY,
  CLOUDFRONT_KEY_PAIR_ID:  process.env.CLOUDFRONT_KEY_PAIR_ID,
  
  MANGODB_URL:  process.env.MANGODB_URL,



}
