config = require("cson-config").load()
cookieParser = require("cookie-parser") config.session.secret
express = require "express"
model = require("./lib/model")()
passport = require "passport"
{Strategy} = require "passport-twitter"
session = require "express-session"
sessionStore = new session.MemoryStore()

# auth

passport.use new Strategy config.twitter, (token, secret, profile, next) ->
	next null, {token, secret}

passport.serializeUser (user, next) ->
    next null, user

passport.deserializeUser (obj, next) ->
    next null, obj

# start server

app = express()
server = require("http").Server app
io = require("socket.io") server
server.listen config.port
console.log "server listening on #{config.port}"

# express

app.use express.static "#{__dirname}/public"

app.use session
	key: config.session.key
	secret: config.session.secret
	resave: yes
	saveUninitialized: yes
	store: sessionStore

app.use passport.initialize()
app.use passport.session()

app.get "/", (req, res) ->
	res.sendFile "#{__dirname}/index.html"

app.get "/auth/twitter", passport.authenticate "twitter"

app.get "/auth/twitter/callback", passport.authenticate "twitter",
	successRedirect: "/"
	failureRedirect: "/"

# express logged in only

app.use (req, res, next) ->
	return next "Not logged in" unless req.session?.passport?.user
	req.user = req.session.passport.user
	next()

app.post "/api/0/stream", (req, res, next) ->
	return next "Missing key: keywords" unless req.body.keywords
	model.registerStream req.body.keywords, next

# socket.io

io.use (socket, next) ->
	req = headers: cookie: socket.request.headers.cookie
	cookieParser req, null, (e) ->
		return next e if e
		name = config.session.key
		socket.sessionID = req.signedCookies[name] || req.cookies[name];
		sessionStore.load socket.sessionID, (e, session) ->
			return next e if e
			return next "Not logged in" unless session?.passport?.user
			socket.user = session.passport.user
			next()

io.on "connection", (socket) ->

	socket.on "room:join", (room) -> socket.join room
	socket.on "room:leave", (room) -> socket.leave room
