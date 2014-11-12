var Grid = React.createClass({displayName: 'Grid',
  getInitialState: function() {
    return {
      partZoomed : null
    };
  },

  handleClick: function(_part) {
    if(_part.props.partId+"" === this.state.partZoomed+""){
      this.setState({partZoomed: null})
    }
    else{
      this.setState({partZoomed: _part.props.partId})
    }
  },

  render: function(){
    var zoomClass = (this.state.partZoomed == null) ? "not-zoomed" : "zoomed part-"+this.state.partZoomed;

    return (
    	React.createElement("div", {id: "grid", className: zoomClass}, 
        this.props.parts.map(function(part, i) {
          return (
            React.createElement(Part, {onClick: this.handleClick, title: part, key: i, partId: i})
          );
        }, this)
    	)
    );
  }
});


React.render(
  React.createElement(Grid, {parts: ["Ressources", "Print Material", "Host's kit", "Mamassembly's Material"]}),
  document.getElementById('main')
);