const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const usersSchema = new mongoose.Schema({
    email: {
        type:String, 
        required: true, 
        unique: true ,
    },
    password: { 
        type:String,
        required:true,
    }, 
    username: {
        type:String, 
        required: true, 
    },
    role: {
        type:String, 
        enum: ['USER', 'ADMIN'],
        required: true , 
        default: 'USER'
    }, 
    storageUsed: {
        type:Number, 
        default: 0 
    },
     refreshToken: {
        type: String,
        default: null, 
    },
}, { timestamps: true })

usersSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



const userModel = mongoose.model('User', usersSchema);
module.exports = userModel;