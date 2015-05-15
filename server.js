var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');


var port = process.env.PORT || 8080;
app.set('superSecret','p@$$w0rd!');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(morgan('dev'));


app.get('/',function(req,res){
	res.send('Its working proper.');
});


var apiRoutes = express.Router();

apiRoutes.get('/values',function(req,res){
	res.send('Hello from unsecure ser')
}); 


app.listen(port);
console.log('Server started at http://localhost:'+port);


