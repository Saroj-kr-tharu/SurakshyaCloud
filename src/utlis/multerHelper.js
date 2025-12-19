const multer = require('multer');

const path = require('path');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { BUCKET_NAME } = require('../config/serverConfig');
const s3 = require('../config/awsConfig');


const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|xls|xlsx|txt|zip|rar/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimetype =
      allowedTypes.test(file.mimetype) ||
      file.mimetype.startsWith('application/') ||
      file.mimetype.startsWith('text/');

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  }
});






async function getFileSignedUrl({ s3Key,  expiresIn = 3600, mode = "preview", originalName}) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: s3Key 
    };

    console.log(mode, originalName)

    if (mode === "preview") {
      params.ResponseContentDisposition = "inline";
    }

    if (mode === "download") {
      params.ResponseContentDisposition = `attachment; filename="${originalName}"`;
    }

    const command = new GetObjectCommand(params);

    const signedUrl = await getSignedUrl(s3, command, { expiresIn });
    return signedUrl;

  } catch (error) {
    throw new Error(`Failed to generate signed URL: ${error.message}`);
  }
}








module.exports = {
  
  upload,
  
  uploadSingle: upload.single('file'),
  
  uploadMultiple: upload.array('files', 10),
  
  getFileSignedUrl,

  
  
};