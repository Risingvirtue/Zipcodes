var fs = require('fs');
//server.js

var express = require('express');
var app = express();


app.use(express.static('public'));
var zipcodeDict = {};
fs.readFile('zipcodeDict.txt', 'utf8', function(err, contents) {
	var contents = JSON.parse(contents);
	zipcodeDict = contents;
	console.log(Object.keys(contents).length);
});
app.get('/', function(req,res){
	res.send(zipcodeDict);
})
app.get('/:zipcode', function(req, res) {
	var zipcode = req.params["zipcode"];
	if (zipcode in zipcodeDict) {
		res.send(zipcodeDict[zipcode]);
	} else {
		res.send("Error");
	}
});



var listener = app.listen(process.env.PORT, function() {
	console.log('Your app is listening on port ' + listener.address().port);
})

