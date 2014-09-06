/** @jsx React.DOM */

var Words = React.createClass({

	onSend: function() {
		$.ajax({
			url: "/api/0/stream",
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({keywords: ['opice']})
		}).done(function (res) {
				console.log(res);
			}.bind(this));
	},

	render: function () {
		this.onSend();
		return (
			<div>
				<h1>Words</h1>
			</div>
			);
	}

});
