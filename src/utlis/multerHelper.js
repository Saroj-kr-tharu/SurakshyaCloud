const multer = require('multer');

const path = require('path');



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




module.exports = {
  upload,
};