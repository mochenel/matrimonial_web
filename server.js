const express = require("express");
const mysql   = require("mysql");
const bodyParser  = require("body-parser");
var cors = require('cors');
const app  = express();
app.use(cors());

const verifyToken = require('./middleware/verifyToken');
const addNewUser = require('./middleware/addNewUser');
const userLoginCheck = require('./middleware/userLoginCheck');
const findAllUsers = require('./middleware/findAllUsers'); 
const welcome = require('./middleware/welcome');
const validateFields = require('./middleware/validateFields');

const port = process.env.PORT || 9000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

app.post('/signup',validateFields,addNewUser);
app.post('/userlogin', userLoginCheck);

//route middleware to verify a token 
app.use(verifyToken);

app.get('/', welcome);
app.get('/users', findAllUsers);



