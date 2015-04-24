var Q 			= require('q');
var express    	= require('express');
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var path    	= require('path');
var fs  		= require('fs');
var busboy 		= require('connect-busboy');

var userLogin 	= require('./models/userLogin');
var jwt 		= require('./models/jwt');
var control		= require('./models/control');
var app 		= express();





app.use(cors());
app.use(busboy());
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'front-end')));
// app.use(express.static(path.join(__dirname, 'upload')));
app.use("/img", express.static(path.join(__dirname, 'img')));

app.get('/home',function(req,res) {
	

	jwt.decode(token).then(function(jwt_decoded) {

		
		res.json(jobs);

	}).catch(function(error) {
		
		res.status(401).send({
			message: 'You are not authorized'
		});
	})
	


	
})

app.get('/control',function(req,res) {
	
		control.setSlides('123','sdfjdks/asdfsd').then(function(data) {
			console.log(data);
			res.status(200).send({
				message: 'You are not authorized'
			});
		})
		

})

app.get('/control/getSlides',function(req,res) {
		

		control
		.getSlides().then(function(slides) {
			
			res.status(200).send({
				slides: slides
			});
		})
		.catch(function(error) {
		
		res.status(404).send({
			message: error
		});
	})
		

})

app.post('/control/setSlides',function(req,res) {
		var slide 		= req.body;
		var slide_id	= slide.id;
		console.log(req);

		control.setSlides(slide_id,slide).then(function(data) {
			
			res.status(200).send({
				message: 'You are not authorized'
			});
		})
		

})

app.post('/control/rmSlides',function(req,res) {
		
		var slide_id	= req.body.slide_id;
		control.rmSlides(slide_id).then(function(data) {
			res.status(200).send({
				message: data
			});
		})
		

})

app.get('/control/getProducts',function(req,res) {
		

		control
		.getProducts().then(function(products) {
			
			res.status(200).send({
				products: products
			});
		})
		.catch(function(error) {
		
		res.status(404).send({
			message: error
		});
	})
		

})
app.post('/control/setProducts',function(req,res) {
		var product 	= req.body;
		var product_id	= product.id;
		console.log(product_id);

		control.setProducts(product_id,product).then(function(data) {
			
			res.status(200).send({
				message: 'You are not authorized'
			});
		})
		

})

app.post('/img',function (req, res) {

    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
	      var stream = fs.createWriteStream(__dirname + '/img/' + filename);
	      file.pipe(stream);
	      stream.on('close', function () {
	        // console.log('File ' + filename + ' is uploaded');
	        
	        res.json({
	          filename: filename
	        });
	      });
    });
});


app.post('/register',function(req,res) {
	var user = req.body;
	// console.log(user);
	var newUser = {
		email: user.email,
		password: user.password
	}
	var loginID = '1234561' 

	
	userLogin.register(newUser)
		.then(function(token) {
			res.status(200).send({
				token: token,
				loginID: loginID,
				email: newUser.email
			});
		})
		.catch(function(error) {
			console.log('call register fail',error)
			res.status(401).send({
				error: error,
				loginID: loginID
			});
		})

})

var jobs = [
	'Cook',
	'SuperHero',
	'Unicorn Wisperer',
	'Toast Inspector'
];

app.get('/jobs',function(req,res) {
	
	//check if the request has a authorization header
	if(!req.headers.authorization){
		return res.status(401).send({message: 'You are not authorized'})
	}

	
	var token = req.headers.authorization.split(' ')[1];
	
	//verify token
	jwt.decode(token).then(function(jwt_decoded) {

		
		res.json(jobs);

	}).catch(function(error) {
		
		res.status(401).send({
			message: 'You are not authorized'
		});
	})
	


	
})

app.listen(3000,function() {
	console.log('api listening on 3000');
})


















