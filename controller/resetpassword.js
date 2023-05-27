const sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = sib.ApiClient.instance
const bcrypt = require('bcrypt');

const User = require('../models/users');
const Forgotpassword = require('../models/forgotpassword');

const forgotpassword = async (req, res) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({ email:email });
        if(user){

            const forgetpass = new Forgotpassword({  active: true, userId:user._id.toString() })
            forgetpass.save()
            let id = forgetpass._id.toString()
            // return res.json({ id:forgetpass._id.toString(), message: 'success forgrtpass req', sucess: true })

            const client = sib.ApiClient.instance
            const apiKey = client.authentications['api-key']
            apiKey.apiKey = process.env.API_KEY
        
            const tranEmailApi = new sib.TransactionalEmailsApi()
            
            const sender = {
                email : 'satishdpanchal786@gmail.com',
                name : 'satish'
            }
            
            const recievers = [
                {
                    email : email,
                },
            ]
        
            tranEmailApi.sendTransacEmail({
                sender,
                to: recievers,
                subject: 'forgotpass please reset',
                textContent: `Follow the link and reset password`,
                htmlContent: `Click on the link below to reset password <br> <a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            })

            return res.status(202).json({ message: "mail sent succesfully", sucess: true });
            

        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.status(500).json({ message: err, sucess: false });
    }
}

const resetpassword = (req, res) => {
    const id =  req.params.id;
    Forgotpassword.findOne({ _id :id }).then(forgotpasswordrequest => {
        if(forgotpasswordrequest){
            Forgotpassword.updateOne({ _id :id },{ active: false});
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
            res.end()
        }
    })
}

const updatepassword = (req, res) => {
    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne({ _id: resetpasswordid }).then(resetpasswordrequest => {
            User.findOne( { _id : resetpasswordrequest.userId}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password
                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            User.updateOne({ _id : resetpasswordrequest.userId},{ password: hash }).then(() => {
                                res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }
}

module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}