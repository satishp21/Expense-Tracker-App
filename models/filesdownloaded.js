const mongoose = require('mongoose');

const filesDownloadedSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
    },
    userId:{
        type: String
    }
});

module.exports = mongoose.model('FilesDownloaded', filesDownloadedSchema);