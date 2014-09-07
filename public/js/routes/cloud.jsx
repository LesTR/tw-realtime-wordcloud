/** @jsx React.DOM */

var Cloud = React.createClass({

	getInitialState: function () {
		return {
			data: [],
			keywords: [],
			dataVersion: 0
		};
	},

	componentDidMount: function () {
		this.props.socket.emit('topic:subscribe', this.props.topic);
		this.props.socket.on('wordcloud', this.dataRecieve);
		this.props.socket.on('wordcloud-total', this.countRecieve);
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
		this.setState({
			'data': data.counts,
			'keywords': data.keywords,
			'dataVersion': this.state.dataVersion + 1
		});
	},

	countRecieve: function (data) {
		this.setState({
			'total': data.total
		});
	},


	render: function () {
		return (
			<div className="container-in">
				<h1>{this.state.keywords.join(', ')} - {this.state.total} tweets</h1>
				<WordCloud data={this.state.data} dataVersion={this.state.dataVersion} />
			</div>
			);
	}

});
