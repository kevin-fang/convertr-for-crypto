var express = require('express')
var app = express()
var request = require('request')

var poloUrl = "https://poloniex.com/public?command=returnTicker"

function getAltPriceFromBTC(from, to, coinPrices, callback) {
	var price = coinPrices[to + "_" + from]
	if (price != undefined) {
		callback(price.last, null)
	} else {
		callback(null, "Could not find coin. From: " + from + ", to: " + to)
	}
}

app.get('/crypto', (req, res) => {
	var from = req.query.from.toUpperCase()
	if (from === "USD") from = "USDT"

	var to = req.query.to.toUpperCase()
	if (to === "USD") to = "USDT"

	var amt = Number(req.query.amt)

	console.log("from:" + from + ", to:" + to + ", amt:" + amt)
	
	res.setHeader('Content-Type', 'text/html')

	request({
		url: poloUrl,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			//console.log(body)
			var coinPrices = JSON.parse(JSON.stringify(body))
			getAltPriceFromBTC(from, to, coinPrices, (altPrice, err) => {
				if (err == null) {
					var convertedPrice = altPrice * amt
					res.write("" + amt + " of " + from + " is currently worth: " + convertedPrice + " " + to)
				} else {	
					console.log(err)
					res.write("Error: " + err)
				}
				res.end()
			})
		} else {
			console.log("Error: " + error)
		}
	})

})

var port = 8080
app.listen(port)
console.log("Listening on port: " + port)
