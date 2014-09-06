async = require "async"
kafka = require "kafka-node"
zkManager = require "./zkNodesManager.coffee"

module.exports = (kafkaClient, io) ->

	consumer = null
	producer = new kafka.Producer kafkaClient

	consumer.on "message", (m) ->
		try
			io.to(m.topic).emit "wordcloud", JSON.parse m.value
		catch e
			console.error e

	registerStream: (user, keywords, next) ->
		topic = user.profile.id
		async.series [
			(next) ->
				producer.createTopics [topic], next
			(next) ->
				zkManager.setKeywordPath topic, user, keywords, next
			(next) ->
				return consumer.addTopics [topic], next if consumer
				consumer = new kafka.Consumer kafkaClient, [{topic}]
		], (e) ->
			next e, {topic}
