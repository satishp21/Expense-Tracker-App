const Expense = require('../models/expenses');
const User = require('../models/users');
const FilesDownloaded = require('../models/filesdownloaded');
const s3Services = require('../services/s3services')
const mongoose = require('mongoose')

const addexpense = async (req, res) => {
    try {
        const { expenseamount, description, category } = req.body;

        if (!expenseamount || !description || !category) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const expense = new Expense({
            expenseamount,
            description,
            category,
            user: req.user.id
        });

        const savedExpense = await expense.save();

        const totalExpense = Number(req.user.totalexpense) + Number(expenseamount);
        await User.updateOne({ _id: req.user._id }, { totalexpense: totalExpense });

        return res.status(201).json({ expense: savedExpense, success: true });  
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err, success: false });
    }
}

const getexpenses = async (req, res) => {
    try {
        let page = req.params.page || 1;
        let itemsPerPage = Number(req.params.selectedValue || 3);

        const totalItems = await Expense.countDocuments({ user: req.user.id });
        const expenses = await Expense.find({ user: req.user.id })
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        return res.status(200).json({
            expenses,
            info: {
                currentPage: page,
                hasNextPage: totalItems > page * itemsPerPage,
                hasPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                lastPage: Math.ceil(totalItems / itemsPerPage) // rounds up number to equal to or greater than value (it has to take greater value so it wont skip any expense which is at last+++++)
            },
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err, success: false });
    }
}

const deleteexpense = async (req, res) => {
    console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssstart')
    try{
    const expenseid = req.params.expenseid; //this is obtained from url of delete req

    console.log(expenseid,"expenseid")

    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false})
    }

    const expenseobj = await Expense.findOneAndDelete(expenseid).populate("user")
    // console.log(expenseobj,">>>>>>>>>>>>>>>>expenseobj")
    // console.log(expenseobj.user, "this is the user>>>>>>>>>");

    const totalExpense = Number(expenseobj.user.totalexpense.toString()) - Number(expenseobj.expenseamount)
    console.log(totalExpense)

    // await Expense.deleteOne({ _id: expenseid })
    await User.updateOne({ _id: expenseobj.user._id }, { totalexpense: totalExpense })
    
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    }catch (err) {
        console.log(err)
        return res.status(500).json({success : false, error: err})
    }
}

const downloadExpenses =  async (req, res) => {
    try {
        if(!req.user.ispremiumuser){
            return res.status(401).json({ success: false, message: 'User is not a premium User'})
        }
        const expenses = await Expense.find({userId : req.user._id })
        console.log(expenses,">>>>>>>>>>>>>>>>expensesarray")

        const strigifiedexpenses = JSON.stringify(expenses)
        console.log(strigifiedexpenses)

        const userId = req.user.id;

        const filename = `Expense.txt${userId}/${new Date}`
        const fileURL= await s3Services.uploadTOS3(strigifiedexpenses,filename)

        new FilesDownloaded ({ fileUrl:fileURL ,userId:userId}).save()
        
        console.log(fileURL)
        res.status(200).json({fileURL,success:true})

    } catch(err) {
        console.log(err)
        res.status(500).json({ error: err, success: false, message: 'Something went wrong'})
    }
};

module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    downloadExpenses
}