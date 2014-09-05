$(function () {

	var socket = io();

	socket.on('connect', function () {
		console.log('socket connected');
	});

	socket.on('pokus', function () {
		console.log('onpokus');
	});

});
