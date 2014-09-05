config = require("cson-config").load()
express = require "express"
app = express()
server = require("http").Server app
io = require("socket.io") server

server.listen config.port
console.log "server listening on #{config.port}"

app.use express.static "#{__dirname}/public"

app.get "/", (req, res) ->
	res.sendFile "#{__dirname}/index.html"

io.on "connection", (socket) ->
	socket.emit "pokus"
