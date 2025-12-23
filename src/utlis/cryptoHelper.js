const crypto  = require('crypto'); 

function GenerateShareToken(){
    return crypto.randomUUID();
}


module.exports = {
    GenerateShareToken,
}