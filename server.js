/*
+++++++++++++++++++++++++++++++++
+Date:    6/20/2016             +
+Author:  Jesus Tellez          +   
+Support: jesus@orangegleam.com +
+++++++++++++++++++++++++++++++++
*/


var express = require('express');
var bodyParser  = require('body-parser');
var mongoose   = require('mongoose');


var app = express(); //define our app using express

 

// Line #1 configure app to use bodyParser()
// Line #2 allow us to get data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080; //set the port


// connect to the soccer players database
mongoose.connect('mongodb://greyhat:people55@jello.modulusmongo.net:27017/jamu2sEz');

var Player = require('./app/models/player');

//ROUTES FOR THE API ==========================================================

//create the router
var router = express.Router(); 

// middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening with the middleware.');
        next(); // make sure we go to the next routes and don't stop here
});


//Test route to make sure everythying is working as it should (url/api)
router.get('/', function(req, res){
  res.json({ message: 'Welcome to the API'});
});

//on routes that end with /players
//--------------------------------------------------------------
router.route('/players')

    //create a player (accessed at POST http://localhost:8080/api/players)
    .post(function(req, res){
        
        var player = new Player(); //create a new instance of the Player model
        player.name = req.body.name; //set the players name (comes from the request)
        
        //save the player and check for errors
        player.save(function(err){
            if (err)
                res.send(err);
                
            res.json({ message: 'Player created!'});    
        });
        
    });
    //get all the players (accessed at GET http://localhost:8080/api/players)
   /* .get(function(req, res){
        Player.find(function(err, players){
            if (err)
                res.send(err);
                
            res.json(players);    
        });
    });
 */
//Register our routes ----------------------------------------------------------
//Routes will be prefixed with /api
app.use('/api',router);

//Start the server
//=============================================================================
app.listen(port);
console.log('Things are happening on port ' + port);