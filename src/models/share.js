const mongoose = require('mongoose');

const shareSchema  = new mongoose.Schema({
    resourceType: {
        type: String,
        enum: ['file', 'folder'],
        required: true
    },

    resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    token: {
        type: String,
        unique: true,
        index: true,
        required: true
    },

    permission: {
        type: String,
        enum: ['view', 'download'],
        default: 'view'
    },

    expiresAt: {
        type: Date,
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

const shareModel = mongoose.model('Share', shareSchema);
module.exports = shareModel;