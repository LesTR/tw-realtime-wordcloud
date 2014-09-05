config = require("cson-config").load()
express = require "express"
app = express()

app.use express.static "#{__dirname}/public"

app.get "/", (req, res) ->
	res.sendFile "#{__dirname}/index.html"

app.listen config.port
console.log "Express listening on #{config.port}"
