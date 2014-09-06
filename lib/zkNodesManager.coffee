require('cson-config').load __dirname + '/../config.cson'
ZK = require 'zkjs'

zk = new ZK process.config.zookeeperWordcloud

zk.start (err)->
	console.log err if err

zk.on 'expired', ()->
	console.log "ZK session expired ... reconneting".red
	zk.start()


module.exports.createKeywordPath = (keyword, next) ->
	path = "keywords/" + keyword
	zk.mkdirp path, (err) ->
		return next err if err and err != -110 # node allready exists
		next()


module.exports.deleteKeywordPath = (keyword, next) ->
	path = "keywords/" + keyword
	zk.del path, -1, (err) ->
		return next err if err and err != -101 # node didn't exists/allready deleted
		next()


module.exports.setKeywordPath = (path, keywords, next) ->
	module.exports.createKeywordPath path, (err) ->
		return next err if err

		o =
			keywords: keywords

		path = "keywords/" + path
		zk.set path, JSON.stringify(o), -1, (errno) ->
			return next errno if errno
			next()

# usage
#module.exports.createKeywordPath "picka", () ->
#module.exports.deleteKeywordPath "foobar", () ->
#module.exports.setKeywordPath "favorite_singers", ["rihana", "bieber", "gott"], () ->


