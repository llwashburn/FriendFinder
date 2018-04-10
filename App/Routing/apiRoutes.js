//API GET REQUESTS-
//==============================================================
//In each of the cases below when a user visits a link they are shown a JSON of the data in the table. 
//ex: localhost:PORT/api/? 
//Load Data 
//Linking routes to a series of data sources
//This data source holds arrays on information on friends and survey.
//==============================================================
var friendsArray = require("../Data/friends.js");
console.log(friendsArray);

//store survey results for future use
// var surveyData = require("../Data/newfriends.js");
// console.log(surveyData);


//ROUTING - GET ROUTES
//===============================================================
//Below code handles when user visits a page and then shown the JSON of the data in a table
//app referenced in server.js file
//GET REQUESTS-require data from other files
//==============================================================
module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsArray);
        console.log("API Friend Data is working");

    });

    // A GET route with the url / api / friends.This will be used to display a JSON of all possible new friends.
    app.get("/api/friend", function(req, res) {
        res.json(surveyData);
        console.log("new friend data is working");
    });


    //POST REQUESTS
    //================================================================
    //This code handles when user submits a form with data to server
    //The user fills out a friend survey, the data is sent to the server then the server saves the data to the surveyData array
    //defined above? 
    //The JSON is pushed to the appropriate Javascript array
    //================================================================
    app.post("/api/friends", function(req, res) {
        //variable to hold new friend survey results
        //post and parse the new friend survey results to body of api/newfriend
        var surveyData = req.body;
        var surveyName = surveyData.name;
        var surveyPhoto = surveyData.photo;

        var surveyScore = surveyData.scores;

        console.log(surveyScore);

        //create a variable to hold the new friend array to mirror friendsArray in friends.js
        var friendMatch = { name: "", photo: "", difference: 1000 }; //difference between answer of user and friend in array- comparing scores
        // console.log(req.body);
        //the user's results stored in a variable to POST it.
        var userResults = req.body;
        var userScores = userResults.scores;

        //variable to represent the score calculation between user/friends in database
        var scoreDifference = 0; //calculate difference of Friends and user scores

        //SCORE for loop for all the friends in database friendsArray + friendMatch?
        for (var i = 0; i < friendsArray.length; i++) {
            console.log(friendsArray[i]);

            //FRIEND for loop through friend scores and survey scores = .scores
            for (var x = 0; x < friendsArray[i].scores[x]; x++) {
                //difference in scores and friends numbers
                //math absolute? if negative turns positive and stays the same?
                scoreDifference += Math.abs(parseInt(surveyScore[x] - parseInt(friendsArray[i].scores[x])));

                //if total difference less current friend then assign that friend to the correct friend
                if (scoreDifference <= friendMatch.difference) {
                    //set the friendMatch as the new friend and display?
                    friendMatch.name = friendsArray[i].name;
                    friendMatch.photo = friendsArray[i].photo;
                    friendMatch.scoreDifference = scoreDifference;
                }
            }
        }
        //save to database
        friendsArray.push(surveyData);

        res.json(friendMatch); //for HTML

        // app.post(
        //     "/api/clear",
        //     function() {
        //         friendsArray = [];
        //         surveyData = [];
        //     }
        // );
    });
};