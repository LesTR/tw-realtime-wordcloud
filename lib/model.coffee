async = require "async"
kafka = require "kafka-node"

module.exports = (kafkaClient, io) ->

	consumer = new kafka.Consumer kafkaClient, [topic: "keynote"]

	consumer.on "message", (m) ->
		try
			decoded = JSON.parse m.value
			event = if decoded.total then "wordcloud-total" else "wordcloud"
			io.sockets.emit event, decoded
		catch e
			console.error e
