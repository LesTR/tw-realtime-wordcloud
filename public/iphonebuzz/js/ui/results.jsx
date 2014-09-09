/** @jsx React.DOM */
    	var Results = React.createClass({
		  render: function() {
		    return (
		      <div className="results">
		        <h2>Latest Wordclouds</h2>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Keyword</th>
						<th>Date</th>
						<th>Occurencies</th>
						<th>Twitter Account</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Lorem</td>
						<td>Apr 18, 2014</td>
						<td>224 865</td>
						<td>@TwitterHandle</td>
					</tr>
					<tr>
						<td>Lorem</td>
						<td>Apr 18, 2014</td>
						<td>224 865</td>
						<td>@TwitterHandle</td>
					</tr>
					<tr>
						<td>Lorem</td>
						<td>Apr 18, 2014</td>
						<td>224 865</td>
						<td>@TwitterHandle</td>
					</tr>
					<tr>
						<td>Lorem</td>
						<td>Apr 18, 2014</td>
						<td>224 865</td>
						<td>@TwitterHandle</td>
					</tr>
				</tbody>
			</table>
		      </div>
		    );
		  }
		});