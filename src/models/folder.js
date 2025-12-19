const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
    },
    ownerId: {
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref: 'User'
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null, 
    },

    path: {
        type: String,   // for faster queries
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const folderModel = mongoose.model('Folder', folderSchema);
module.exports =folderModel;