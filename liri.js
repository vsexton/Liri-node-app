require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

var pick = function(type, userPick) {
  switch (type) {
    case "concert-this":
      getBands(userPick);
      break;
    case "spotify-this-song":
      getSongs(userPick);
      break;
    case "movie-this":
      getMovie(userPick);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("liri does not recognize this");
  }
};

var getBands = function(artist) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      console.log("venue name: " + response.data[i].venue.name);
      console.log(
        "venue location: " +
          response.data[i].venue.city +
          ", " +
          response.data[i].venue.region +
          ", " +
          response.data[i].venue.country
      );
      console.log(
        "venue date: " +
          moment(response.data[i].venue.datetime).format("MM/DD/YYYY")
      );
      console.log("----------");
    }
  });
};

let getSongs = function(songName) {
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(error, data) {
      if (error) {
        return console.log(error);
      }

      for (var i = 0; i < 5; i++) {
        // console.log(data.tracks.items[i])
        console.log("artists: " + data.tracks.items[i].artists[0].name);
        console.log("song name: " + data.tracks.items[i].name);
        console.log("prview url: " + data.tracks.items[i].preview_url);
        console.log("album name: " + data.tracks.items[i].album.name);
        console.log("----------");
      }
    }
  );
};

var getMovie = function(movie) {
  var queryURL =
    "http://www.omdbapi.com/?t=" +
    movie +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  axios.get(queryURL).then(function(response) {
    // for(var i = 0; i < response.data.length; i++){
    console.log("Title of the Movie: " + response.data.Title);
    console.log("Year the movie came out: " + response.data.Year);
    console.log("IMBD Rating of the movie: " + response.data.imdbRating);
    console.log("Actors: " + response.data.Actors);
    console.log(
      "Country where the move was produced: " + response.data.Country
    );
    console.log("Language of the Movie: " + response.data.language);
    console.log("Plot: " + response.data.plot);
    console.log(
      "Rotten Tomatoes Rating of the movie: " + response.data.TomatoRating
    );
    console.log("Rotten Tomatoes URL: " + response.data.tomatoURL);
    console.log("----------");
  });
};

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
}

var runThis = function(arg1, arg2) {
  pick(arg1, arg2);
};

runThis(process.argv[2], process.argv.slice(3).join(" "));