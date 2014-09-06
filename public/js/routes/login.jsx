/** @jsx React.DOM */

var Login = React.createClass({
	render: function () {
		return (
			<div className="login-dialog">
				<h1>Twitter Realtime WordCloud</h1>
				<p>
					<a href="/auth/twitter" className="btn btn-success btn-lg" role="button">Login with Twitter</a>
				</p>
			</div>
			);
	}

});
