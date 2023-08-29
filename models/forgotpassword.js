const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    active: {
        type: Boolean
    },
    userId: {
        type: String
    },
    createdAt: { type: Date, expires: '1m', default: Date.now }
});

module.exports = mongoose.model('Forgotpassword', forgotPasswordSchema);