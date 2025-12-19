const mongoose = require('mongoose');

const {MANGODB_URL} = require('./serverConfig')


const url = 'mongodb://localhost/twitter_Dev';
const connect = async() => {
    await mongoose.connect(MANGODB_URL);
    
}

module.exports =  connect;