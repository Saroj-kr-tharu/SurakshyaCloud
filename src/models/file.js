const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    ownerId: {
        type:mongoose.Schema.Types.ObjectId, 
        required:true, 
        ref: 'User'
    },

    folderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        default: null
    },

    originalName: {
        type: String,
        required: true
    },

    s3Key: {
        type: String,
        required: true
    },

   

    mimeType: {
        type: String,
        required: true
    },

    size: {
        type: Number, 
        required: true
    },

    status: {
        type: String,
        enum: ['uploading', 'processing', 'completed', 'failed'],
        default: 'uploading'
    },

    isPublic: {
        type: Boolean,
        default: false
    },

    downloadCount: {
        type: Number,
        default: 0
    }


}, { timestamps: true });

const fileModel = mongoose.model('File', fileSchema);
module.exports =fileModel; 