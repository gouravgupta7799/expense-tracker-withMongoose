const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');
const mangoose = require('mongoose');

let router = require('./routers/router.js');
let expense = require('./routers/expense.js');
let prime = require('./routers/purches.js');
let primeUser = require('./routers/primeUser.js');
const forgetPassword = require('./routers/forgetPassword.js');
const dotenv = require("dotenv")
dotenv.config()


const app = express();
app.use(cors());
app.use(bodyperser.json({ extended: false }));


app.use('/user', router);
app.use('/expense', expense);
app.use('/primemember', prime);
app.use('/prime', primeUser);
app.use('/password', forgetPassword);


mangoose.connect(`mongodb+srv://Gourav123:${process.env.mongo_password}@cluster0.dbhrseh.mongodb.net/expense-tracker?retryWrites=true&w=majority`)
  .then(result => {
    app.listen(process.env.PORT)
  })