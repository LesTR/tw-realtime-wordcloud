/** @jsx React.DOM */
var WordCloud = React.createClass({

	getDefaultProps: function() {
		return {
			w: 1110,
			h: 400,
			data: []
		};
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var words = nextProps.data;
		if (words.length) {
			this.fontSize.domain([+words[words.length - 1].value || 1, +words[0].value]);
		}
		this.layout.stop().words(words).start();
		return false;
	},

	componentDidMount: function () {

		var w = this.props.w;
		var h = this.props.h;

		this.words = [];
		var fontSize = this.fontSize = d3.scale.log().range([10, 100]);

		this.layout = d3.layout.cloud()
			.timeInterval(10)
			.size([w, h])
			.fontSize(function (d) {
				return fontSize(+d.value);
			})
			.text(function (d) {
				return d.key;
			})
			.rotate(function () {
				return 0;
			})
			.on("word", function (d) {
				console.log(d)
			})
			.on("end", this.draw);

		var svg = d3.select(this.getDOMNode()).append("svg")
			.attr("width", w)
			.attr("height", h);

		this.background = svg.append("g");
		this.vis = svg.append("g")
			.attr("transform", "translate(" + [w >> 1, h >> 1] + ")");
	},

	draw: function (data, bounds) {
		var fill = d3.scale.category20();
		var w = this.props.w;
		var h = this.props.h;

		var scale = bounds ? Math.min(
			w / Math.abs(bounds[1].x - w / 2),
			w / Math.abs(bounds[0].x - w / 2),
			h / Math.abs(bounds[1].y - h / 2),
			h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
		this.words = data;
		var text = this.vis.selectAll("text")
			.data(this.words, function (d) {
				return d.text.toLowerCase();
			});
		text.transition()
			.duration(1000)
			.attr("transform", function (d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.style("font-size", function (d) {
				return d.size + "px";
			});
		text.enter().append("text")
			.attr("text-anchor", "middle")
			.attr("transform", function (d) {
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.style("font-size", function (d) {
				return d.size + "px";
			})
			.on("click", function (d) {
				load(d.text);
			})
			.style("opacity", 1e-6)
			.transition()
			.duration(1000)
			.style("opacity", 1);
		text.style("font-family", function (d) {
			return d.font;
		})
			.style("fill", function (d) {
				return fill(d.text.toLowerCase());
			})
			.text(function (d) {
				return d.text;
			});
		var exitGroup = this.background.append("g")
			.attr("transform", this.vis.attr("transform"));
		var exitGroupNode = exitGroup.node();
		text.exit().each(function () {
			exitGroupNode.appendChild(this);
		});
		exitGroup.transition()
			.duration(500)
			.style("opacity", 1e-6)
			.remove();
		this.vis.transition()
			.delay(500)
			.duration(250)
			.attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
	},

	render: function () {
		console.log('draw world cloud');

		return <div id="wordCloud"></div>
	}
});