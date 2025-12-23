const mongoose = require('mongoose');

const accessSchema   = new mongoose.Schema({
    resourceType: {
        type: String,
        enum: ['file', 'folder'],
        required: true
    },

    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    permission: {
        type: String,
        enum: ['view', 'download'],
        default: 'view'
    }

}, { timestamps: true });

accessSchema.index({ userId: 1, resourceId: 1 }, { unique: true });

const accessModel  = mongoose.model('Access', accessSchema );
module.exports = accessModel;