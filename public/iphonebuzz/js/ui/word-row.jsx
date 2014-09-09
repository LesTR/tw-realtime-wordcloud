/** @jsx React.DOM */
var WordRow = React.createClass({
	render: function () {
		var style = {
			width: (this.props.value / this.props.total * 100) + "%",
			color: 'black'
		};
		return (
			<div className="progress">
				<div className="progress-bar" role="progressbar" style={style}>
					{this.props.word}
				</div>
			</div>
			);
	}
});