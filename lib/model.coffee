kafka = require "kafka-node"
zkManager = require "./zkNodesManager.coffee"

module.exports = (kafkaClient, io) ->

	consumer = new kafka.Consumer kafkaClient, [topic: "jebka", partition: 0]

	consumer.on "message", (m) ->
		try
			io.to(m.topic).emit "wordcloud", JSON.parse m.value
		catch e
			console.error e

	registerStream: (keywords, streamId, next) ->
		return next "Keywords is not array" unless Array.isArray keywords

		zkManager.setKeywordPath streamId, keywords, (err) ->
			return next err if err

			consumer.addTopics [streamId], (e, added) ->
				return next e if e
				next null, {streamId}

