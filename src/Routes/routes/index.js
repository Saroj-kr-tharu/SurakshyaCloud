const express = require('express');

const router = express.Router();

const {userCtrl, fileCtrl, folderCtrl, itemCtrl, shareCtrl} = require('../../controllers/index')
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
router.post( "/files",usermiddleware.verifyToken, usermiddleware.validateAcessToken , multerHelper.upload.any(),   fileCtrl.addFile );
router.get( "/file/:fileId",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.viewFile );
router.get( "/file/:fileId/details",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.detailsFile );
router.patch( "/file/:fileId/rename",usermiddleware.verifyToken, usermiddleware.validateAcessToken , fileCtrl.renameFile );


// folder
router.post( "/folders",usermiddleware.verifyToken, usermiddleware.validateAcessToken,   folderCtrl.addFolder );
router.get('/folders/root', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.viewRootFolder);
router.get('/folders/:folderId', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.viewFolder);
router.get('/folders/:folderId/details', usermiddleware.verifyToken, usermiddleware.validateAcessToken, folderCtrl.detailsFolder);

// items 
router.delete('/items', usermiddleware.verifyToken, usermiddleware.validateAcessToken, itemCtrl.deleteItems);
router.patch('/items', usermiddleware.verifyToken, usermiddleware.validateAcessToken, itemCtrl.moveItems);

// share
  // public  
router.post( "/share/public", usermiddleware.verifyToken, usermiddleware.validateAcessToken, shareCtrl.createPublicShare );
router.get( "/share/public", usermiddleware.verifyToken, usermiddleware.validateAcessToken, shareCtrl.getAllPublicShare );
router.delete( "/share/public", usermiddleware.verifyToken, usermiddleware.validateAcessToken, shareCtrl.bulkDeleteShare );
router.get('/share/:token', shareCtrl.openShareLink);
router.get('/share/:token/file/:fileId', shareCtrl.getFileShareLink);
// private 
router.post( "/access/grant", usermiddleware.verifyToken, usermiddleware.validateAcessToken, shareCtrl.grantAccess );
router.get( "/access", usermiddleware.verifyToken, usermiddleware.validateAcessToken, shareCtrl.getAllAccessByEmail );
router.get( "/access/:item", usermiddleware.verifyToken, usermiddleware.validateAcessToken, shareCtrl.getAccessItems );




module.exports = router;