/** @jsx React.DOM */
var Search = React.createClass({
		  render: function() {
		    return (
		      <div className="search">
		        <form className="navbar-form navbar-left" role="search">
			        <div className="form-group">
			          <input type="text" className="form-control" placeholder="Search" />
			        </div>
			        <button type="submit" className="btn btn-default">Submit</button>
			      </form>
		      </div>
		    );
		  }
		});