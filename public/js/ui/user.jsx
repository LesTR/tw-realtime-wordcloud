/** @jsx React.DOM */
var User = React.createClass({
		  render: function() {
		    return (
		      <div className="user">
		        <ul className="nav navbar-nav navbar-right">
			        <li className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown"><img src="https://pbs.twimg.com/profile_images/501499626009010178/uGTtxgTE_normal.jpeg" width="24px" height="24px" />@TwitterHandle <span class="caret"></span></a>
			          <ul className="dropdown-menu" role="menu">
			            <li><a href="#">Say Hi!</a></li>
			            <li className="divider"></li>
			            <li><a href="#">Logout</a></li>
			          </ul>
			        </li>
			      </ul>
		      </div>
		    );
		  }
		});
