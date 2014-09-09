config = require("cson-config").load()
express = require "express"
kafka = require "kafka-node"
kafkaClient = new kafka.Client config.zookeeper

# start server

app = express()
server = require("http").Server app
io = require("socket.io") server, {path: "/iphonebuzz/socket.io"}
console.log io
server.listen config.port
console.log "server listening on #{config.port}"

# model

model = require("./lib/model") kafkaClient, io

# express

app.use express.static "#{__dirname}/public"
app.use require("body-parser").json()

app.get "/", (req, res) -> res.sendFile "#{__dirname}/index.html"
app.get "/iphonebuzz", (req, res) -> res.sendFile "#{__dirname}/index.html"
