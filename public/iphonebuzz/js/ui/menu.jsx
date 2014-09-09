/** @jsx React.DOM */
var Menu = React.createClass({
		  render: function() {
		    return (
		      <div className="menu">
		        <ul className="nav navbar-nav">
			        <li className="active"><a href="#">Latest Wordclouds</a></li>
			        <li><a href="#">Top Wordclouds</a></li>
			        <li><a href="#">My Wordclouds</a></li>
			      </ul>
		      </div>
		    );
		  }
		});