/** @jsx React.DOM */

var Login = React.createClass({
	render: function () {
		return (
			<div>
				<h1>Login</h1>
				<p>
					<a href="/auth/twitter" className="btn btn-primary btn-lg" role="button">Login with twitter</a>
				</p>
			</div>
			);
	}

});
