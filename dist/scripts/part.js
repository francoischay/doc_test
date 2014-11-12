var Part = React.createClass({displayName: 'Part',
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
		React.createElement("section", {onClick: this.zoom, className: state, 'data-part': this.props.key}, 
			React.createElement("div", {className: "part-header"}, 
				React.createElement("h2", null, this.props.title), 
				React.createElement("button", {onClick: this.unzoom, className: "button-back"}, "Back to home")
			), 
			React.createElement(PartContent, null)
		)
	);
  }
});