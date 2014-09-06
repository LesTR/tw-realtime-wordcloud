/** @jsx React.DOM */

var Layout = React.createClass({

	getInitialState: function () {
		return {
			route: 'handshake',
			parts: [],
			loggedIn: false,
			content: null
		};
	},

	componentWillMount: function () {
		Backbone.history.start();
		this.props.router.on('route', this.handleOnRoute);

		this.handshake();
		// Precteni uvodni adresy pro pripadne presmerovani
		// console.log(Backbone.history.fragment);
	},

	handshake: function () {
		$.ajax({
			url: "/api/0/handshake"
		}).done(function (res) {
				if (res.loggedIn) {
					this.props.router.navigate('words', true);
					this.setState({
						loggedIn: true
					});
					this.handleOnRoute('words');
				}
				else {
					this.props.router.navigate('login', true);
					this.handleOnRoute('login');
				}
			}.bind(this));
	},

	handleOnRoute: function (path, parts) {
		this.setState({
			route: path,
			parts: parts || []
		});
	},

	renderHandshake: function () {
		return <Handshake />
	},

	renderLogin: function () {
		return <Login />
	},

	renderWords: function () {
		return <Words />
	},

	renderCloud: function (channelCode) {
		return <Cloud channelCode={channelCode} socket={this.props.socket} />
	},

	renderError: function () {
		return <Error />
	},

	renderContent: function () {
		var routes = {
			handshake: this.renderHandshake,
			login: this.renderLogin,
			words: this.renderWords,
			cloud: this.renderCloud,
			error: this.renderError
		};

		return routes[this.state.route].apply(this, this.state.parts)
	},

	render: function () {
		return (
			<div className="jumbotron">
			{this.renderContent()}
			</div>
			);
	}

});
