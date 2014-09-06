async = require "async"
kafka = require "kafka-node"
zkManager = require "./zkNodesManager.coffee"

module.exports = (kafkaClient, io) ->

	consumer = new kafka.Consumer kafkaClient, [topic: "jebka", partition: 0]
	producer = new kafka.Producer kafkaClient

	consumer.on "message", (m) ->
		try
			io.to(m.topic).emit "wordcloud", JSON.parse m.value
		catch e
			console.error e

	registerStream: (user, keywords, next) ->
		streamId = user.profile.id
		console.log streamId
		async.series [
			(next) ->
				producer.createTopics [streamId], next
			(next) ->
				zkManager.setKeywordPath streamId, user, keywords, next
			(next) ->
				consumer.addTopics [streamId], next
		], (e) ->
			next e, {streamId}
