
const express = require('express');
const router = express.Router();

const webCtrl = require('../controllers/web.controller');
const {authMidle} = require('../middlewares')


router.get("/", webCtrl.homePage )

router.get("/login", webCtrl.getLogin)
// router.post("/login", webCtrl.postLogin)

router.get("/register", webCtrl.getRegister)

router.post("/logout", webCtrl.logout)

router.get("/dashboard",authMidle.authGuard, webCtrl.dashboard)

router.get("/preview",authMidle.authGuard, webCtrl.previewFile)

router.delete("/Items",authMidle.authGuard, webCtrl.deleteItems)

router.get("/Items",authMidle.authGuard, webCtrl.detailsItems)

module.exports = router
