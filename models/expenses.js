const mongoose = require('mongoose')
const expenseSchema = {
  expenseamount : {
    type : Number,
    required : true
  },
  category : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    require :true
  }
}

module.exports = mongoose.model('Expense',expenseSchema)


// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Expense = sequelize.define('expenses', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     expenseamount: Sequelize.INTEGER,
//     category: Sequelize.STRING,
//     description: Sequelize.STRING
// })

// module.exports = Expense;