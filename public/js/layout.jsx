/** @jsx React.DOM */

var Layout = React.createClass({

	getInitialState: function () {
		return {
			route: 'handshake',
			parts: [],
			loggedIn: false,
			picture: null,
			screenName: null
		};
	},

	componentWillMount: function () {
		this.props.router.once('route', function(path, parts){
			// Precteni uvodni adresy pro presmerovani po overeni
			this.entryPage = {
				path: Backbone.history.fragment,
				route: path,
				parts: parts
			};
		}.bind(this));
		Backbone.history.start();
		this.props.router.on('route', this.handleRoute);
		this.handshake();
	},

	handshake: function () {
		$.ajax({
			url: "/api/0/handshake"
		}).done(function (res) {
				var path = this.entryPage.path
				var route = this.entryPage.route
				var parts = this.entryPage.parts
				var loggedIn = true;
				var picture = res.picture || null;
				var screenName = res.screenName || null;

				if (!res.loggedIn) {
					path = 'login';
					route = 'login';
					parts = [null];
					loggedIn = false;
				}
				else if (route == 'login' || route == 'handshake') {
					path = 'words';
					route = 'words';
					parts = [null];
				}

				this.props.router.navigate(path);
				this.setState({
					loggedIn: loggedIn,
					picture: picture,
					screenName: screenName
				});
				this.handleRoute(route, parts);
			}.bind(this));
	},

	handleRoute: function (path, parts) {
		console.log('handle route', path, parts);
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
