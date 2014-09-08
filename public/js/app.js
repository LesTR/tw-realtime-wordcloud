$(function () {

	var socket = io();
	var Router = Backbone.Router.extend({
		routes: {
			'': 'cloud',
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
