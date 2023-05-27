const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
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
  userId : {
    type : String,
    required : true
  }
})

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