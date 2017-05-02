//requires
var express = require ('express');
var app = express();
var pg = require ('pg');
var path = require('path');
var bodyParser = require ('body-parser');

//port
var port = 8888;

var config = {
  database: 'Pet_hotel_2',
  host: 'localhost',
  port: 5432,
  max: 12
};// end config

var pool = new pg.Pool ( config );

//globals
var ownersArray = ['Tessa', 'Zee', 'Amy', 'Droo'];




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
  pool.connect(function ( err, connection, done){
    if (err) {
      res.send( 400 );
    } else {
      var resultSet = connection.query("SELECT * FROM owner");
      var allOwners= [];
        resultSet.on('row', function(row){
        allOwners.push(row);

        }); //end on row magic
        resultSet.on('end', function(){
        done();
        console.log(allOwners);
        res.send( allOwners );
      });
    }//end else
  });// end pool connect
  });// end app.get

app.post('/registerOwners', function(req, res){
  console.log('/registerOwners hit');
  // ownersArray.push(req.body.name);
  // console.log(ownersArray);
  // res.send(ownersArray);
  pool.connect(function ( err, connection, done){
    if (err) {
      res.send( 400 );
    } else {
      var resultSet = connection.query("INSERT INTO owner (name) values ($1)", [req.body.name]);

      done();
      res.sendStatus( 200);
    }//end else
  });// end pool connect
});

app.post ('/addPet', function(req, res){
  pool.connect(function ( err, connection, done){
    if (err) {
      res.send( 400 );
    } else {
      var resultSet = connection.query("INSERT INTO owner (name) values ($1); INSERT INTO pets (pet, breed, color) values ($2, $3, $4)", [req.body.owner, req.body.pet, req.body.breed, req.body.color]);


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
      var petSet = connection.query("SELECT FROM owner");
      allPets= [];
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
//
// app.delete('/deletePets/:id', function(req, res){
//   console.log('this is req.params.id field', req.params.id);
//   pool.connect (function ( err, connection, done ){
//     if (err){
//       res.send( 400 );
//     } else {
//       connection.query("DELETE FROM pet_hotel_2 WHERE id=$1", [req.params.id]);
//       done();
//       res.send("deleted");
//     }//end else
//   });
// });
