/** @jsx React.DOM */

var Error = React.createClass({
	render: function () {
		var words = [
			{key: '404', value: 15},
			{key: 'not found', value: 12},
			{key: 'page', value: 10},
			{key: 'www', value: 8},
			{key: 'Web', value: 5},
			{key: 'server', value: 4},
			{key: 'error', value: 3},
			{key: 'Web caution', value: 4},
			{key: 'Missing', value: 5},
			{key: 'Cloud', value: 4},
			{key: 'Wordcloud', value: 6},
			{key: 'required', value: 5},
			{key: 'NodeJS', value: 6},
			{key: 'JajaScript', value: 5},
			{key: 'try', value: 7},
			{key: 'Incompatible', value: 3},
			{key: 'Help', value: 4},
			{key: 'Think', value: 2},
			{key: 'Offline', value: 5},
			{key: 'Oops!', value: 7},
			{key: 'reached', value: 4},
			{key: 'Alert', value: 7},
			{key: 'Ponny', value: 1},
			{key: 'little', value: 1},
			{key: 'Occurred', value: 6},
			{key: 'File', value: 4},
			{key: 'Image', value: 3},
			{key: 'Unexpected', value: 4},
			{key: 'Indexing', value: 5},
			{key: 'Publishing', value: 6},
			{key: 'was', value: 6}
		];

		words = words.sort(function(a,b){return b.value - a.value});

		return (
			<div className="container-in">
				<WordCloud data={words} h="600" />
			</div>
			);
	}

});

