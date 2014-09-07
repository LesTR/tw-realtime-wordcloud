async = require "async"
kafka = require "kafka-node"
zkManager = require "./zkNodesManager.coffee"

module.exports = (kafkaClient, io) ->

	consumer = null
	producer = new kafka.Producer kafkaClient

	processMessage = (m) ->
		try
			decoded = JSON.parse m.value
			event = if decoded.total then "wordcloud-total" else "wordcloud"
			io.to(m.topic).emit event, decoded
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
				consumer.on "message", processMessage
				next()
		], (e) ->
			next e, {topic}
