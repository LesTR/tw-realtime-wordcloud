/** @jsx React.DOM */

var Cloud = React.createClass({

	getInitialState: function () {
		return {
			data: {}
		};
	},

	componentDidMount: function () {
		this.props.socket.emit('topic:subscribe', this.props.topic);
		this.props.socket.on('wordcloud', this.dataRecieve);
	},

	componentWillUnmount: function () {
		this.props.socket.emit('topic:unsubscribe', this.props.topic);
	},

	componentDidUpdate: function (prevProps) {
		if (prevProps.topic != this.props.topic) {
			this.props.socket.emit('topic:unsubscribe', prevProps.topic);
			this.props.socket.emit('topic:subscribe', this.props.topic);
		}
	},

	dataRecieve: function (data) {
		this.setState({
			'data': data.counts
		});
		this.renderBubles();
	},

	renderData: function () {
		var total = _.reduce(
			this.state.data,
			function (res, word) {
				return res + word.value;
			}, 0
		);

		return _.map(this.state.data, function (word) {
			return <WordRow key={word.key} total={total} value={word.value} word={word.key} />;
		});
	},

	renderBubles: function () {
		var diameter = 600,
			format = d3.format(",d"),
			color = d3.scale.category20c();

		var bubble = d3.layout.pack()
			.sort(null)
			.size([diameter, diameter])
			.padding(1.5);

		d3.selectAll("svg").remove();

		var svg = d3.select(this.getDOMNode()).append("svg")
			.attr("width", diameter)
			.attr("height", diameter)
			.attr("class", "bubble");

		var data = _.map(this.state.data, function (word) {
			return {
				"name": word.key,
				"value": word.value
			}
		});

		var node = svg.selectAll(".node")
			.data(bubble.nodes({children: data})
				.filter(function (d) {
					return !d.children;
				}))
			.enter()
			.append("g")
			.attr("class", "node")
			.attr("transform", function (d) {
				return "translate(" + d.x + "," + d.y + ")";
			});

		node.append("title")
			.text(function (d) {
				return d.name + ": " + format(d.value);
			});

		node.append("circle")
			.attr("r", function (d) {
				return d.r;
			})
			.style("fill", function (d) {
				return color(d.name);
			});

		node.append("text")
			.attr("dy", ".3em")
			.style("text-anchor", "middle")
			.text(function (d) {
				return d.name.substring(0, d.r / 3);
			});

//		d3.select(this.getDOMNode()).style("height", diameter + "px");
	},


	render: function () {
		return (
			<div>
				<h1>Cloud</h1>
			</div>
			);
	}

});
