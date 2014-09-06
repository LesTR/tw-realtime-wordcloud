/** @jsx React.DOM */

var Login = React.createClass({
	render: function () {
		return (
			<div className="login-dialog">
				<h1>Twitter Realtime Wordlcloud</h1>
				<p>
					<a href="/auth/twitter" className="btn btn-primary btn-lg" role="button">Login with Twitter</a>
				</p>
			</div>
			);
	}

});
