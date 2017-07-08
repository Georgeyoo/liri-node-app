// Required for NPM Packages
var twitter = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotifyKeys = require("./keys.js");
var omdb = require("./keys.js");
var request = require('request');
var fs = require('fs');

// API Keys
var twitterOne = twitter.twitterKeys.consumer_key;
var twitterTwo = twitter.twitterKeys.consumer_secret;
var twitterThree = twitter.twitterKeys.access_token_key;
var twitterFour = twitter.twitterKeys.access_token_secret;
var twitterKey = twitter.twitterKeys.consumer_key;

var spotifyId = spotifyKeys.spotifyKeys.client_id;
var spotifySecret = spotifyKeys.spotifyKeys.client_secret;

var omdbKey = omdb.requestKeys.request_key;


// Global Variables
var input = process.argv;


// Function Definitions

// Utilize twitter api to fetch my top twenty tweets
function tweets() {

	var client = new Twitter({
	  	consumer_key: twitterOne,
		consumer_secret: twitterTwo,
		access_token_key: twitterThree,
		access_token_secret: twitterFour,
	});

	var params = {screen_name: 'georgeyoo4'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {

	    	console.log("-----Tweets-----");

	    	for (var i = 0; i < tweets.length; i ++) {
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
				console.log("-----------------");
			}
		}
	});
}

// Utilize OMDB API to search for movies
function movie() {

	var movieTitle = input[3];
	var mTitle = movieTitle.split("+");

	var omdbURL = "http://www.omdbapi.com/?apikey=" + omdbKey + "&t=" + mTitle;
	request(omdbURL, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log("-----Movie Result-----");
			console.log("---Title---");
			console.log(JSON.parse(body).Title);
			console.log("---Year---");
			console.log(JSON.parse(body).Year);
			console.log("---IMDB Rating---");
			console.log(JSON.parse(body).imdbRating);
			console.log("---Ratings---");
			console.log(JSON.parse(body).Ratings[1].Value);
			console.log("---Country---");
			console.log(JSON.parse(body).Country);
			console.log("---Language---");
			console.log(JSON.parse(body).Language);
			console.log("---Plot---");
			console.log(JSON.parse(body).Plot);
			console.log("---Actors---");
			console.log(JSON.parse(body).Actors);

		}
	})
}

// Utilize Spotify to search for the input song title
function song() {

	var spotify = new Spotify({
  		id: spotifyId,
  		secret: spotifySecret
	});

	var songInput;
	// var songTitle = songInput.split("+");

	if (process.argv.length < 4) {

		songInput = "Ace of Base - The Sign";

	} else {

		songInput = input[3];
		// songTitle = songInput.split("+");

	}
	spotify.search({ type: 'track', query: songInput }, function(err, data) {
		if(err) {
			console.log('Error occurred: ' + err);
			return;
		}
		console.log("-----Spotify Result-----");
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].preview_url);
		console.log(data.tracks.items[0].album.artists[0].name);	
	})
}

// Searches for song titles in the random.txt using the Spotify API
function doStuff() {
	fs.readFile("random.txt", "utf8", function(error, data){
		var array = data.split(",")
		songInput = array[1] 
		
		var spotify = new Spotify({
  			id: spotifyId,
  			secret: spotifySecret
		});

		spotify.search({ type: 'track', query: songInput }, function(err, data) {
			if(err) {
				console.log('Error occurred: ' + err);
				return;
			}
			console.log("-----Spotify Result-----");
			console.log(data.tracks.items[0].name);
			console.log(data.tracks.items[0].preview_url);
			console.log(data.tracks.items[0].album.artists[0].name);	
		})
	})
}

switch(input[2]) {

	case "movie-this":
		movie();
		break;

	case "spotify-this-song":
		song();
		break;

	case "my-tweets":
		tweets();
		break;

	case "do-what-it-says":
		doStuff();
		break;
}
