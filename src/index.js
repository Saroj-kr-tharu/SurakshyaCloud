const express = require('express')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')
const connect = require('./config/database.js');


const {PORT}= require('./config/serverConfig')
const appRoutes = require('./Routes/index')

const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser());

    
    
    app.use("/api", appRoutes)

    app.listen(PORT, async () => {
        console.log(` Surakshya server start at ${PORT}`)
        await connect();
        console.log('Mongodb Connected');
    })

}

serverSetupAndStart()