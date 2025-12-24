const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require("express-ejs-layouts");

const cookieParser = require('cookie-parser')
const connect = require('../src/config/database.js');

const {PORT}= require('../src/config/serverConfig.js')
const appRoutes = require('../src/Routes/index')

const rootDir = require('./utils/pathUtlis')
const {router} = require("./routes/webRoutes.js")

const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
   
    app.use(cookieParser());
    app.use(expressLayouts);
    app.use(express.static(path.join(rootDir, 'public')))

    app.set('view engine', 'ejs');
    app.set('views', './web/views');
    app.set("layout", "layouts/main");

    app.use("/api", appRoutes)
    app.use((req, res, next) => {
        res.locals.user = req.user || null;
        next();
    });

    app.use("/", router)

    app.use((req,res, next) => {
       res.render('404_page', )
    })

    app.listen(PORT, async () => {
        console.log(` Surakshya server start at ${PORT}`)
        await connect();
        console.log('Mongodb Connected');
    })

}

serverSetupAndStart()