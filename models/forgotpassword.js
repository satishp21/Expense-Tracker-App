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
    expiresby: {
        type: Date
    }
});

module.exports = mongoose.model('Forgotpassword', forgotPasswordSchema);

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Forgotpassword = sequelize.define('forgotpassword', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE
// })

// module.exports = Forgotpassword;