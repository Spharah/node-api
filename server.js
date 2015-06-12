var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');


var port = process.env.PORT || 8080;
app.set('superSecret',config.secret);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//enable routing
var apiRoutes = express.Router();



apiRoutes.post('/account/signup',function(req,res){

	res.send('You have been registered successfully.');
});


apiRoutes.post('/account/signin',function(req,res){
	res.send('User does not exists');
});





apiRoutes.get('/values',function(req,res){
	res.send('Hello from unsecure service')
}); 


//return token
apiRoutes.get('/authenticate',function(req,res){	
var user ={};

	var token = jwt.sign(user,app.get('superSecret'),{
		expiresInMinutes:1440
	});

	res.json({'token':token})
});



//authenticate api 
apiRoutes.use(function(req,res,next){

	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token)
	{
		jwt.verify(token,app.get('superSecret'),function(err,decoded){
			if(err){
				return res.json({success:true,message:'Failed to authenticate'});
			}
			else
			{
				req.decoded=decoded;
				next();
			}
		});
	}
	else
	{
		return res.status(403).send({
			success:false,
			message:'No token provided'
		});
	}
});


apiRoutes.get('/values/1',function(req,res){
	res.send('Hello from secure service')
}); 


app.use('/api',apiRoutes);
app.listen(port);


console.log('Server started at http://localhost:'+port);


