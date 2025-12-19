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
    }
}, { timestamps: true });

const folderModel = mongoose.model('Folder', folderSchema);
module.exports =folderModel;