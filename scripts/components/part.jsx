var React = require('react');
var PartContent = require('./partContent.jsx');

var Part = React.createClass({
  getInitialState: function() {
    return {isZoomed: false};
  },

  zoom: function () {
  	if(this.state.isZoomed) return;

  	this.setState({isZoomed:true})
    this.props.onClick(this);
  },

  unzoom: function () {
  	if(!this.state.isZoomed) return;
  	
  	this.setState({isZoomed:false})
    this.props.onClick(this);
  },

  render: function(){
  	var state = this.state.isZoomed ? 'part zoomed' : "part not-zoomed";

    return (
		<section onClick={this.zoom} className={state} data-part={this.props.key}>
			<div className="part-header">
				<h2>{this.props.title}</h2>
				<button onClick={this.unzoom} className="button-back">Back to home</button>
			</div>
			<PartContent />
		</section>
	);
  }
});

module.exports = Part;