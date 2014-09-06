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
		this.props.router.on('route', this.handleRoute);

		this.handshake();
		// Precteni uvodni adresy pro pripadne presmerovani
		this.entryPage = Backbone.history.fragment;
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
					this.handleRoute('words');
				}
				else {
					this.props.router.navigate('login', true);
					this.handleRoute('login');
				}
			}.bind(this));
	},

	handleRoute: function (path, parts) {
		this.setState({
			route: path,
			parts: parts || []
		});
	},

	handleCloudCreate: function (words, topic) {
		this.setState({
			words: words,
			topic: topic
		});
		this.props.router.navigate('cloud/' + topic, true);
	},

	renderHandshake: function () {
		return <Handshake />
	},

	renderLogin: function () {
		return <Login />
	},

	renderWords: function () {
		return <Words onSend={this.handleCloudCreate} />
	},

	renderCloud: function (topic) {
		return <Cloud words={this.state.words} topic={topic} socket={this.props.socket} />
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
		return this.renderContent();
	}

});
