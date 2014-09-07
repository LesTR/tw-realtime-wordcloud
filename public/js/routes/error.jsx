/** @jsx React.DOM */

var Error = React.createClass({
	render: function () {
		var words = [
			{key: '404', value: 10},
			{key: 'not found', value: 9},
			{key: 'page', value: 7},
			{key: 'www', value: 6},
			{key: 'web', value: 5},
			{key: 'server', value: 4},
			{key: 'error', value: 3},
			{key: 'web caution', value: 2},
			{key: 'missing', value: 2}
		];

		return (
			<div className="container-in">
				<WordCloud data={words} h="600" />
			</div>
			);
	}

});

