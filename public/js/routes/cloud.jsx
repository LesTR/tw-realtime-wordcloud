/** @jsx React.DOM */

var Cloud = React.createClass({

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
		console.log(data);
	},

	render: function () {
		return (
			<div>
				<h1>Cloud</h1>
			</div>
			);
	}

});
