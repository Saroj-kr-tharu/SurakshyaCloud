const express = require('express');

const router = express.Router();

const {userCtrl, fileCtrl, folderCtrl} = require('../../controllers/index')
const {usermiddleware} = require('../../middlewares/index')
const multerHelper = require('../../utlis/multerHelper');


router.get("/check", (req, res) => {
  return res.json({ message: " Surakshya@ is good to GO" });
});


// auth // user  
router.post( "/auth/signup", usermiddleware.Signup, userCtrl.signup );
router.post( "/auth/login", usermiddleware.Login, userCtrl.signin );
router.get( "/auth/veriyToken", userCtrl.veriyToken );
router.post( "/auth/refresh-token", usermiddleware.verifyRefreshToken, userCtrl.refreshToken );
router.post( "/auth/logout",  userCtrl.logout );


// file / user 
router.post( "/user/files",usermiddleware.verifyToken, usermiddleware.validateAcessToken , multerHelper.upload.any(),   fileCtrl.addFile );
router.get( "/user/file/:fileId",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.viewFile );
router.delete( "/user/file",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.deleteFile );


// folder
router.post( "/user/folders",usermiddleware.verifyToken, usermiddleware.validateAcessToken,   folderCtrl.addFolder );


 
module.exports = router;