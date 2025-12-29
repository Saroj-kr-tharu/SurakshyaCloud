const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require("express-ejs-layouts");

const cookieParser = require('cookie-parser')
const csrf = require("csurf");
const connect = require('../src/config/database.js');

const {PORT}= require('../src/config/serverConfig.js')
const appRoutes = require('../src/Routes/index')

const { globalState, authMidle} = require('./middlewares')

const rootDir = require('./utils/pathUtlis')
const router = require("./routes/web.routes.js")


const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser());

    app.use(expressLayouts);
    app.use(express.static(path.join(rootDir, 'public')));
    
    app.use(authMidle.authMiddleare)
    app.use(globalState);
    
    
    
    app.set('view engine', 'ejs');
    app.set('views', './web/views');
    app.set("layout", "layouts/main");
    
    const csrfProtection = csrf({
        cookie: {
            key: "_csrf",
            httpOnly: true,
            sameSite: "lax",
            secure: false // true in production (HTTPS)
        }
    });
    app.use("/api", appRoutes)

    app.use(csrfProtection);
     app.use((req, res, next) => {
        res.locals.csrfToken = req.csrfToken();
        next();
    });
    
   
    
    app.use("/", router)

   

    app.use((req,res, next) => {
       res.render('404_page', )
    })

    app.use((err, req, res, next) => {
        if (err.code === "EBADCSRFTOKEN") {
            res.render('404_page', )
        }
        next(err);
    });

    app.listen(PORT, async () => {
        console.log(` Surakshya server start at ${PORT}`)
        await connect();
        console.log('Mongodb Connected');
    })

}

serverSetupAndStart()