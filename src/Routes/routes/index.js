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
router.get( "/file/:fileId/details",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.detailsFile );
router.delete( "/user/file",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.deleteFile );
router.patch( "/user/file/:fileId/rename",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.renameFile );
router.patch( "/user/file/:fileId/move",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.moveFile );


// folder
router.post( "/user/folders",usermiddleware.verifyToken, usermiddleware.validateAcessToken,   folderCtrl.addFolder );
router.get('/folders/root', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.viewRootFolder);
router.get('/folders/:folderId', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.viewFolder);
router.get('/folders/:folderId/details', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.detailsFolder);
router.patch('/folders/:folderId/move', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.moveFolder);

// items => file and folder 
router.delete('/items', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.deleteItems);

 
module.exports = router;