/** @jsx React.DOM */

var Words = React.createClass({

	getInitialState: function () {
		return {
			keywords: []
		};
	},

	getDefaultProps: function () {
		return {
			onSend: function (words, topic) {
			}
		}
	},

	handleChange: function (event) {
		this.setState({
			keywords: event.target.value.trim().split(/\s+/)
		});
	},

	handleSend: function () {
		if (this.state.keywords.length == 0) {
			return;
		}
		$.ajax({
			url: "/api/0/stream",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({keywords: this.state.keywords})
		}).done(function (res) {
				this.props.onSend(this.state.keywords, res.topic);
			}.bind(this));
	},

	render: function () {
		return (
			<div className="container-in">
				<h1>Realtime Twitter Word Cloud</h1>
				<div className="form-group">
					<label for="inputkeyword">Enter comma-separated keywords.</label>
					<input onChange={this.handleChange} type="text" className="form-control" id="inputkeyword" placeholder="Keywords ..." />
					<button onClick={this.handleSend} className="btn btn-success btn-lg" role="button">Do the Magic</button>
				</div>
			</div>
			);
	}

});
