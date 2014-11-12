var React = require('react');
var Part = require('./part.jsx');

var Grid = React.createClass({
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
    	<div id="grid" className={zoomClass}>
        {this.props.parts.map(function(part, i) {
          return (
            <Part onClick={this.handleClick} title={part} key={i} partId={i}></Part>
          );
        }, this)}
    	</div>
    );
  }
});

module.exports = Grid;