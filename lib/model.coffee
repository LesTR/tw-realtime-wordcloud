kafka = require "kafka-node"
zkManager = require "./zkNodesManager.coffee"

module.exports = (kafkaClient, io) ->

	consumer = new kafka.Consumer kafkaClient, [topic: "jebka", partition: 0]

	consumer.on "message", (m) ->
		try
			io.to("jebka").emit "wordcloud", JSON.parse m.value
		catch e
			console.error e

	registerStream: (keywords, next) ->
		return next "Keywords is not array" unless Array.isArray keywords

		# tmp hardcoded
		topic = "jebka"

		zkManager.setKeywordPath topic, keywords, (err) ->
			return next err if err

			return next null, {topic: jebka}

		@getTopic keywords, (e, topic) ->
			return next e if e
			consumer.addTopics [topic], (e, added) ->
				return next e if e
				next null, {topic}

