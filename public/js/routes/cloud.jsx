/** @jsx React.DOM */

var Cloud = React.createClass({

	getInitialState: function () {
		return {
			data: {}
		};
	},

	componentDidMount: function () {
		this.props.socket.emit('topic:subscribe', this.props.topic);
		this.props.socket.on('wordcloud', this.dataRecieve);
	},

	componentWillUnmount: function () {
		this.props.socket.emit('topic:unsubscribe', this.props.topic);
	},

	componentDidUpdate: function (prevProps) {
		if (prevProps.topic != this.props.topic) {
			this.props.socket.emit('topic:unsubscribe', prevProps.topic);
			this.props.socket.emit('topic:subscribe', this.props.topic);
		}
	},

	dataRecieve: function (data) {
		this.setState({
			'data': data
		});
	},

	renderData: function() {
		var total = _.reduce(
			this.state.data,
			function (res, word) {
				return res + word.value;
			}, 0
		);

		return _.map(this.state.data, function (word) {
			return <WordRow key={word.key} total={total} value={word.value} word={word.key} />;
		});
	},

	render: function () {
		return (
			<div>
				<h1>Cloud</h1>
				<div>
					{this.renderData()}
				</div>
			</div>
			);
	}

});
