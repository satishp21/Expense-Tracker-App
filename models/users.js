const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  ispremiumuser : {
    type : Boolean,
    default :false,
    required : true
  },
  totalexpense : {
    type : Number,
    default :0,
    required : true
  }
})

module.exports = mongoose.model('User',userSchema)





// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: Sequelize.STRING,
//     email: {
//        type:  Sequelize.STRING,
//        allowNull: false,
//        unique: true
//     },
//     password: Sequelize.STRING,
//     ispremiumuser: Sequelize.BOOLEAN,
//     totalExpenses:{
//         type :Sequelize.INTEGER,
//         defaultValue:0
//     }
// })

// module.exports = User;