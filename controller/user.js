const User = require('../models/users');
const bcrypt = require('bcrypt')  //with help of bcrypt we can save the passwords in the form of hash in database
const jwt = require('jsonwebtoken')

function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

 const signup = async (req, res)=>{
    try{
    const { name, email, password } = req.body;
    console.log('email', email)
    if(isstringinvalid(name) || isstringinvalid(email || isstringinvalid(password))){
        return res.status(400).json({err: "Bad parameters . Something is missing"})
    }
    const saltrounds = 10;  //this will make sure that different hash will produced even if two user having same passwork this will give extre layer of security
    bcrypt.hash(password, saltrounds, async (err, hash) => {
        
        const user = new User ({ name, email, password: hash})
        user.save()
        res.status(201).json({message: 'Successfuly create new user'})
    })
    }catch(err) {
            res.status(500).json(err);
    }
}

const generateAccessToken = (id, name, ispremiumuser) => {
    return jwt.sign({ userId : id, name: name, ispremiumuser } ,process.env.SEC_KEY);
}

const login = async (req, res) => {
    try{
    const { email, password } = req.body;
    if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({message: 'EMail idor password is missing ', success: false})
    }
    console.log(password);
    const user  = await User.find({  email: email })
        if(user.length > 0){
           bcrypt.compare(password, user[0].password, (err, result) => {
           if(err){
            throw new Error('Something went wrong')
           }
            if(result === true){
                res.status(200).json({success: true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser)})
            }
            else{
            return res.status(400).json({success: false, message: 'Password is incorrect'})
           }
        })
        } else {
            return res.status(404).json({success: false, message: 'User Doesnot exitst'})
        }
    }catch(err){
        res.status(500).json({message: err, success: false})
    }
}

module.exports = {
    signup,
    login,
    generateAccessToken
}