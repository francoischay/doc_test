/** @jsx React.DOM */
var Grid = React.createClass({displayName: 'Grid',
  render: function(){
    return (
    	React.createElement("div", {id: "grid"}, 
    		React.createElement(Part, {title: "Ressources", partId: "0"}), 
    		React.createElement(Part, {title: "Print Material", partId: "1"}), 
    		React.createElement(Part, {title: "Host's kit", partId: "2"}), 
    		React.createElement(Part, {title: "Mamassembly's material", partId: "3"})
    	)
    );
  }
});
React.render(
  React.createElement(Grid, null),
  document.getElementById('main')
);