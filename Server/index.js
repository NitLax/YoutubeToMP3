const express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
const ytdl = require('ytdl-core');
var http = require('http'); // Fait appel à http.js
var url = require('url'); // Fait appel à url.js
var path = require("path");
// const fs = require('fs');
// const { getInfo } = require('ytdl-getinfo')
// app.use(express.urlencoded());
// app.use(cors());
// app.use(express.json());
var generateDownloadLink = require('generate-download-link');


//creation de server avec http.createServer(), function-> fuct a exe qd visiteur arrive sur site 
// var server = http.createServer(function(req, res) {
// 	//req-> requete du viiteur
// 	//res-> objet a remplir dans fonction

//   // res.writeHead(200);// on renvoie "ok tout va bien chakal"
//   res.writeHead(200, {"Content-Type": "text/html"});
  
//   res.end('index.html'); //return string
// });



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8000, () => {
	console.log('Server Works !!! At port 8000');
});


app.get('/',function(req,res){
    res.setHeader('Content-Type', 'text/html');
  	res.sendFile(path.join(__dirname+'/../index.html'));
});


// // Example of filtering the formats to audio only.
// ytdl.getInfo(videoID, (err, info) => {
//   if (err) throw err;
//   console.log('Formats with only audio: ' + audioFormats.length);
// });

app.get('/downloadmp3', (req,res) => {
    var URL = req.query.URL;
    // var name = req.query.name; 
    // ytdl.GetVideoInfo(identifier)

	ID=ytdl.getURLVideoID(URL);
	ytdl.getInfo(ID, (err, info) => {
		if (err) throw err;
		let author = info.author.name;
		let title = info.title;
		// res.header('Content-Disposition',`attachment; filename=${author}_${title}.mp3`);
  		let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
		url2=audioFormats[0].url;
		console.log(url2);
		// res.redirect(url2);
		res.render('player.ejs',{url: url2, img: ID,auth : author, tit : title});
		// ytdl(url, {
	 //    format: `mp3`,
	 //    // quality: `highestaudio`,
	 //    }).pipe(res);
	});
});

