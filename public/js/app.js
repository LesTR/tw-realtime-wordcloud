$(function () {

	var socket = io();
	var Router = Backbone.Router.extend({
		routes: {
			'': 'handshake', // GET /api/0/handshake
			'login': 'login',
			'words': 'words', // POST /api/0/stream
			'cloud/:topic': 'cloud',
			'*default': 'error'
		}
	});

	var router = new Router();

	React.renderComponent(
		Layout({
			router: router,
			socket: socket
		}),
		document.getElementById('app')
	);

	socket.on('connect', function () {
		console.log('socket connected');
	});

	socket.on('pokus', function () {
		console.log('onpokus');
	});

});
