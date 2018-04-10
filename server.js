//SET UP NODE SERVER FOR APPLICATION

//DEPENDENCIES- node packages=======================================================
//all the code from the libray is inserted into these variables
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");


//CREATE APP - SET EQUAL TO EXPRESS==================================================
//CREATE A NEW EXPRESS WEB SERVER
var app = express();

//SET PORT TO PROCESS ENVIRONMENT FOR HEROKU=========================================
//|| MEANING OR USE DEFAULT PORT 3000
var PORT = process.env.PORT || 3000;

//SET UP BODY PARSER==================================================================
//this may need to be true according to Tim and Josh notes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text()); //explain this


//ROUTER================================================================================
//include the route files in our server
//include the api route first bc that's  where we are pulling the data to display in the html pages
require('./app/Routing/apiRoutes.js')(app);
require("./app/Routing/htmlRoutes.js")(app);


//SET UP LISTENER========================================================================
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);

});