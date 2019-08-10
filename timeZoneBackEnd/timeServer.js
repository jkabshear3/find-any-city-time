var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var unirest = require("unirest")

var app = express();
app.use(bodyParser.json())
app.use(cors())

app.post('/cities', (req, res) => {
	console.log(req.body.city)
		unirest.get(`https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${req.body.city}`)
			.header("X-RapidAPI-Host", "devru-latitude-longitude-find-v1.p.rapidapi.com")
			.header("X-RapidAPI-Key", "b313d516b2msh0db0b65dbef210dp186cc8jsn3ed57421d8db")
			.end(function (result) {
				console.log("THE RESULTS ARE IN", result)
				if (result.body.Results.legnth === 0) {
					return res.json([{
						name: "No such city"
					}])
				}
				else {
					console.log(result.status, result.headers, result.body);
			  		return res.json(result.body.Results)
			  	}
		  		
			});
	
})



app.listen(3030)