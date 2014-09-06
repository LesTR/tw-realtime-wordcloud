kafka = require "kafka-node"

module.exports = (kafkaClient, sockets) ->

#	consumer = new kafka.Consumer kafkaClient, [topic: "test", partition: 0], autoCommit: false

#	consumer.on "message", (m) ->
#		console.log m

	registerStream: (keywords, next) ->
		@getTopic keywords, (e, topic) ->
			return next e if e
			consumer.addTopics [topic], (e, added) ->
				return next e if e
				next null, {topic}

