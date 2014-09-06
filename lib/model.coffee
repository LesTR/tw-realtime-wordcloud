module.exports = (kafkaClient) ->

	registerStream: (keywords, next) ->
		next null, streamId: 123
