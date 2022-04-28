require("dotenv").config();
require("./config/database");
const express = require("express");
const app = express();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs'); 
// const User = require("./model/user");
const userCtrl = require('./controllers/user');
const auth = require('./middleware/auth');
// const res = require("express/lib/response");


app.use(express.json());

// importing user context




app.post('/signup', userCtrl.signup);
app.post('/login', userCtrl.login);
app.get("/home", (req, res,next) => {
    res.status(200).send("Welcome ");
  });


module.exports = app;