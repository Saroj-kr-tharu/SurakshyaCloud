const path = require('path');

const {s3client} = require('../config/awsConfig')
const {BUCKET_NAME, CLOUDFRONT_DOMAIN, CLOUDFRONT_PRIVATE_KEY, CLOUDFRONT_KEY_PAIR_ID} = require('../config/serverConfig')
const { DeleteObjectCommand, PutObjectCommand, DeleteObjectsCommand  } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");


class s3Service {
    
    
    async pushObject({ buffer, mimetype, s3Key, metadata = {} }){
        try {

            const command = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: s3Key,
                Body: buffer,
                ContentType: mimetype,
                Metadata: metadata
                });

            const response =  await s3client.send(command);
            return response;
            

        } catch (error) {
            console.log("something went wrong in service s3Service level  (pushObject) ")
            
             throw error;
           
        }
    }

    async pullObject({ s3Key,  expiresIn = 300,}){
        try {

            const signedUrl = getSignedUrl({
                url: `${CLOUDFRONT_DOMAIN}${s3Key}`,
                dateLessThan: new Date(Date.now() + expiresIn * 1000).toISOString(),
                privateKey: CLOUDFRONT_PRIVATE_KEY,
                keyPairId: CLOUDFRONT_KEY_PAIR_ID
            });
            return signedUrl;
           
            

        } catch (error) {
            console.log(`Failed to generate signed URL for ${s3Key}: ${error.message}`)
            throw  error;
        }
    }

    async deleteObject(object_key){
        try {
            const command = new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: object_key,
            });

            const res =  await s3client.send(command);
            return res; 

        } catch (error) {
            console.log("something went wrong in service s3Service level  (deleteObject) ", error )
             throw  error
        }
    }

    async bulkdeleteObject(object_key_list){
        try {
            
            const command = new DeleteObjectsCommand({
                Bucket: BUCKET_NAME,
               Delete: {
                    Objects: object_key_list, 
                    Quiet: false // Set to true to only receive error responses
                }
            });

            const res =  await s3client.send(command);
            return res; 

        } catch (error) {
            console.log("something went wrong in service s3Service level  (bulkdeleteObject) ", error )
             throw  error
        }
    }

    
    generateS3Key({ userId, originalName }) {
        const ext = path.extname(originalName);
        const timestamp = Date.now();
        const randomStr = Math.round(Math.random() * 1e9);

        return `uploads/${userId}/${timestamp}-${randomStr}${ext}`;
    }
 



}

const s3service = new s3Service()


module.exports = s3service;