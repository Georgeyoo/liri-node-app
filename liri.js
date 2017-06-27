var twitter = require("./keys.js");
var spotify = require("./keys.js");
var omdb = require("./keys.js");

var twitterKey = twitter.twitterKeys.consumer_key;
console.log(twitterKey);

var spotifyKey = spotify.spotifyKeys.client_id;
console.log(spotifyKey);

var omdbKey = omdb.requestKeys.request_key;
console.log(omdbKey);


if (process.argv[2] === "my-tweets") {
	console.log()
}