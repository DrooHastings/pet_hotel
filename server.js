//requires
var express = require ('express');
var app = express();
var pg = require ('pg');
var path = require('path');
var bodyParser = require ('body-parser');

//port
var port = 8888;

var config = {
  database: 'pet_hotel',
  host: 'localhost',
  port: 5432,
  max: 12
};// end config

var pool = new pg.Pool ( config );

//globals
var ownersArray = ['Tessa', 'Zee', 'Amy', 'Droo'];
var allPets = [];



// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


//create server
app.listen (port, function(){
  console.log('server up on:', port);

});// end app.listen

app.get('/', function(req, res){
  console.log('/ hit');
  res.sendFile(path.resolve('public/views/index.html'));
});

app.get('/getOwners', function(req, res){
  console.log('/getOwners hit');
  res.send(ownersArray);

});// end app.get

app.post('/registerOwners', function(req, res){
  console.log('/registerOwners hit');
  ownersArray.push(req.body.name);
  console.log(ownersArray);
  res.send(ownersArray);
});

app.post ('/addPet', function(req, res){
  console.log('req.body');
  pool.connect(function ( err, connection, done){
    if (err) {
      res.send( 400 );
    } else {
      var resultSet = connection.query("INSERT INTO pets (owner, pet, breed, color) values ($1, $2, $3, $4)", [req.body.owner, req.body.pet, req.body.breed, req.body.color]);
      console.log(resultSet.body);
      done();
      res.send( 200 );
    }//end else
  });// end pool connect
});//end add pet


app.get('/getAllPets', function(req, res){


  console.log('/getAllPets hit');

  pool.connect( function (err, connection, done){
    if (err){
      console.log("error in /getAllPets");
      res.send(400);
    }
    else {
      console.log('connected to the db in /getAllPets');
      var petSet = connection.query("SELECT * from pets");
      petSet.on('row', function(row){
        allPets.push(row);
      }); //end on row magic
      petSet.on('end', function(){
        done();
        res.send(allPets);
      });//end on end
    } //end else
  }); // end pool connect


});//end get pets aJaz
