/*
+++++++++++++++++++++++++++++++++
+Date:    6/20/2016             +
+Author:  Jesus Tellez          +   
+Support: jesus@orangegleam.com +
+++++++++++++++++++++++++++++++++
*/


var express = require('express');
var bodyParser  = require('body-parser');

var app = express(); //define our app using express

// Line #1 configure app to use bodyParser()
// Line #2 allow us to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080; //set the port

//ROUTES FOR THE API ==========================================================
var router = express.Router(); // get an instance of the express Router

//Path to routes
router.get('/', function(req, res){
  res.json({ message: 'Welcome to the API'});
});

//Register our routes ----------------------------------------------------------
//Routes will be prefixed with /api
app.use('/api',router);

//Start the server
//=============================================================================
app.listen(port);
console.log('Things are happening on port ' + port);