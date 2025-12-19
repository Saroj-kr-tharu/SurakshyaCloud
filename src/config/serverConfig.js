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

  CLOUDFLARE_CDN_UR:  process.env.CLOUDFLARE_CDN_UR,
  
  MANGODB_URL:  process.env.MANGODB_URL,



}
