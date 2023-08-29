require("dotenv").config();
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

const User = require("../models/users");
const Forgotpassword = require("../models/forgotpassword");

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  console.log('this reset pass user',user)

  const forgetdoc = await Forgotpassword.create({ active: true,userId : user._id })
  const id = forgetdoc._id

  console.log(forgetdoc,"forgetdoc",id,"idddddd")

  let testAccount = await nodemailer.createTestAccount();

  //connect with smtp
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "kenny.rogahn34@ethereal.email", //this fake email,pass is given by etherial email which changes every time we open https://ethereal.email/ web so update everytime when u want to check forgot pass functinality and link for reset would be at same website in messagge section
      pass: "EcJ3f7jCwYtEZggmsF",
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <kenny.rogahn34@ethereal.email>', // sender address
    to: `${email}`, // list of receivers
    subject: " your expense trackers forgotpass link", // Subject line
    text: "Follow the link and reset password", // plain text body
    html: `Click on the link below to reset password <br> <a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end();
};

const resetpassword = (req, res) => {
  const id = req.params.id;
  Forgotpassword.findOne({ _id:id }).then((forgotpasswordrequest) => {
    if (forgotpasswordrequest) {
    //   forgotpasswordrequest.update({ active: false });
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
                                </html>`);
      res.end();
    }
  });
};

const updatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findOne({ _id: resetpasswordid }).then(
      (resetpasswordrequest) => {
        User.findOne({ _id: resetpasswordrequest.userId }).then(
          (user) => {
            // console.log('userDetails', user)
            if (user) {
              //encrypt the password
              const saltRounds = 10;
              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  console.log(err);
                  throw new Error(err);
                }
                bcrypt.hash(newpassword, salt, function (err, hash) {
                  // Store hash in your password DB.
                  if (err) {
                    console.log(err);
                    throw new Error(err);
                  }
                  User.updateOne({_id:user._id},{ password: hash }).then(() => {
                    res
                      .status(201)
                      .json({ message: "Successfuly update the new password" });
                  });
                });
              });
            } else {
              return res
                .status(404)
                .json({ error: "No user Exists", success: false });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

module.exports = {
  forgotPassword,
  updatepassword,
  resetpassword,
};
