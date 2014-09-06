/** @jsx React.DOM */

var Login = React.createClass({
	render: function () {
		return (
			<div className="login-dialog">
				<h1>Realtime Twitter Word Cloud</h1>
				<p>
					<a href="/auth/twitter" className="btn btn-success btn-lg" role="button">Sign in with Twitter</a>
				</p>
			</div>
			);
	}

});
