const Razorpay = require('razorpay');
const Order = require('../models/orders')
const User = require('../models/users')
const userController = require('./user')

const purchasepremium = async (req, res) => {
    try {
        const amount = 2500;
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const order = await rzp.orders.create({ amount, currency: "INR" });
        console.log(order,'await rzp.orders.create({ amount, currency: "INR" });')
        const newOrder = new Order({
            orderid: order.id,
            status: 'PENDING',
            userId: req.user._id
        });
        await newOrder.save();
        return res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err })
    }
}

 const updateTransactionStatus = async (req, res ) => {
    try {
        const userId = req.user._id;
        const user  = await User.find({_id : userId})
        const { payment_id, order_id} = req.body;
        const order  = await Order.find({orderid : order_id})   

        const promise1 = Order.updateOne({orderid : order_id},{ paymentid: payment_id, status: 'SUCCESSFUL'}) 
        const promise2 = User.updateOne({ _id: req.user._id },{ ispremiumuser: true }) 

        Promise.all([promise1, promise2]).then(()=> {
            return res.status(202).json({sucess: true, message: "Transaction Successful", token: userController.generateAccessToken(userId,undefined , true) });
        }).catch((error ) => {
            console.log(error)
            throw new Error(error)
        })

    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })
    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}