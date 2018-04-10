//HTML GET REQUESTS-help direct user
//The Code below handles when the user visits a page
//In each of the case below the user is shown an html page of content. 
//========================================================================================
// A GET Route to / survey which should display the survey page.
// A default, catch - all route that leads to home.html which displays the home page.
// Your apiRoutes.js file should contain two routes:
var path = require("path");


//Send a file using express or node 
//when the user goes to /survey route then the app will send them to the html file
module.exports = function(app) {
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname + '/../Public/survey.html'));
    });
    //route for home page
    // * means every other route 
    // MUST be the very last route to load
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname + "/../Public/home.html"));
    });

};


// A POST routes / api / friends.This will be used to handle incoming survey results.This route will also be used to handle the compatibility logic.
// You should save your application 's data inside of app/data/friends.js as an array of objects. Each of these objects should roughly follow the format below.