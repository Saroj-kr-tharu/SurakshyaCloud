const s3Client = require('../config/awsConfig')
const {BUCKET_NAME} = require('../config/serverConfig')
const { DeleteObjectCommand, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");



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

            const response =  await s3Client.send(command);
            return response;
            

        } catch (error) {
            console.log("something went wrong in service s3Service level  (pushObject) ")
            
             throw error;
           
        }
    }

    async pullObject(data, expiresIn=3600){
        try {
           
            const command = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: s3Key
            });

            const response =  await getSignedUrl(s3Client, command, { expiresIn });
            return response ; 

        } catch (error) {
            console.log("something went wrong in service s3Service level  (verifyToken) ")
            throw  error;
        }
    }

    async deleteObject(data){
        try {
            
            const command = new DeleteObjectCommand({
                Bucket: BUCKET_NAME,
                Key: data.object_key,
            });

            await s3Client.send(command);
            

        } catch (error) {
            console.log("something went wrong in service s3Service level  (genRefreshToken) ", error )
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