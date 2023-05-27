const express = require('express');
const fs =require('fs')
const path = require('path')
var cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
//morgan middleware is being used to log HTTP requests. morgan is a popular logging middleware for Express.js that logs requests in a specific format, based on a pre-defined set of tokens


const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const purchaseRoutes = require('./routes/purchase')
const resetPasswordRoutes = require('./routes/resetpassword')
const expenseRoutes = require('./routes/expense')
const premiumFeatureRoutes = require('./routes/premiumFeature')

const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

const app = express();
const dotenv = require('dotenv');
const { Stream } = require('stream');

app.use(helmet()) //middleware to  HTTP headers to improve security
app.use(compression())
app.use(morgan('combined',{stream:accessLogStream}))  
// above line of code adds the morgan middleware to the Express.js application, which logs HTTP requests in the "combined" format and writes the logs to the accessLogStream writable stream.

// get config vars
dotenv.config();

app.use(cors());

// app.use(bodyParser.urlencoded());  ////this is for handling forms
app.use(express.json());  //this is for handling jsons

app.use('/user', userRoutes)
app.use('/expense', expenseRoutes)
app.use('/purchase', purchaseRoutes)
app.use('/premium', premiumFeatureRoutes)
app.use('/password', resetPasswordRoutes)

mongoose.connect('mongodb+srv://piyushgsuthar7:Ja9jRGepIghA4O6y@cluster0.kngxlkj.mongodb.net/expenseapp?retryWrites=true&w=majority')
.then(result => {
  console.log('connected')
  app.listen(process.env.PORT)
}).catch(err => {console.log(err)})