/** @jsx React.DOM */
var ModalForm = React.createClass({
		  render: function() {
		    return (
		    	<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
				        <h4 className="modal-title">Wordcloud settings</h4>
				      </div>
				      <div className="modal-body">
				        <form role="form">
						  <div className="form-group">
						    <input type="text" className="form-control" id="inputkeyword" placeholder="Keyword" />
						  </div>
						  <div className="form-group">
						    <input type="input" className="form-control" id="inputlocation" placeholder="Location (optional)" />
						  </div>
						  <div className="form-group">
						    <input type="input" className="form-control" id="inputlanguage" placeholder="Language (optional)" />
						  </div>
						  <div className="text-center">
						  	<button type="submit" className="btn btn-primary">Continue</button>
						  </div>
						</form>
				      </div>
				    </div>
				  </div>
				</div>
		    );
		  }
		});