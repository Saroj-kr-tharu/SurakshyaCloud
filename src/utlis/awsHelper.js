const s3 = require('../config/awsConfig');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { BUCKET_NAME } = require('../config/serverConfig');

async function getFileSignedUrl(s3Key, expiresIn = 300) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: s3Key
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn });
  return signedUrl;
}

module.exports = getFileSignedUrl;