require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys");

var spotify = new Spotify(keys.spotify);

var pick = function(type, userPick) {
    switch(type){
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
}
var getBands = function(artist){


var queryURL ="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
axios.get(queryURL).then(function(response){
   
   for(var i = 0; i < response.data.length; i++){
       console.log("venue name: " + response.data[i].venue.name)
       console.log("venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " +response.data[i].venue.country)
       console.log("venue date: "+ moment(response.data[i].venue.datetime).format("MM/DD/YYYY"))
       console.log("----------")
   }
})
}
let getSongs = function(songName){
    spotify.search({
        type:"track", 
       query:songName 
    },function(error,data){
        if (error){
            return console.log(error)
        }
    
    for (var i = 0; i < 5; i++){
        // console.log(data.tracks.items[i])
        console.log("artists: " + data.tracks.items[i].artists[0].name)
        console.log("song name: " + data.tracks.items[i].name)
        console.log("prview url: " + data.tracks.items[i].preview_url)
        console.log("album name: " + data.tracks.items[i].album.name)
        console.log("----------")
    }
})
}


var runThis = function(arg1, arg2){
    pick(arg1, arg2)

}
runThis(process.argv[2],process.argv.slice(3).join(" "))
