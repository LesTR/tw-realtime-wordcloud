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
			'data': data.counts
		});
	},


	render: function () {
		return (
			<div className="container-in">
				<h1>Cloud</h1>
				<WordCloud data={this.state.data} />
			</div>
			);
	}

});
