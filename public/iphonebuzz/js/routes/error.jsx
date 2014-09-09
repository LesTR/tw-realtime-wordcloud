/** @jsx React.DOM */

var Error = React.createClass({
	render: function () {
		var words = [
			{key: '404', value: 200},
			{key: 'Not Found', value: 100},
			{key: 'Page', value: 20},
			{key: 'www', value: 2},
			{key: 'Web', value: 10},
			{key: 'server', value: 4},
			{key: 'Error', value: 8},
			{key: 'Web caution', value: 2},
			{key: 'Missing', value: 7},
			{key: 'Cloud', value: 2},
			{key: 'Wordcloud', value: 3},
			{key: 'Required', value: 1},
			{key: 'NodeJS', value: 4},
			{key: 'JajaScript', value: 1},
			{key: 'try', value: 3},
			{key: 'Incompatible', value: 1},
			{key: 'Help', value: 3},
			{key: 'Think', value: 2},
			{key: 'Offline', value: 1},
			{key: 'Oops!', value: 3},
			{key: 'Reached', value: 4},
			{key: 'Alert', value: 1.5},
			{key: 'Ponny', value: 0.1},
			{key: 'little', value: 0.1},
			{key: 'Occurred', value: 1},
			{key: 'File', value: 2},
			{key: 'Image', value: 0.5},
			{key: 'Unexpected', value: 1},
			{key: 'Indexing', value: 1},
			{key: 'Publishing', value: 0.8},
			{key: 'was', value: 2},
			{key: 'Permissions', value: 4}
		];

		words = words.sort(function(a,b){return b.value - a.value});
		//words = words.map(function(b){b.value=b.value/10; return b.value});


		return (
			<div className="container-in">
				<WordCloud data={words} h="600" />
			</div>
			);
	}

});

