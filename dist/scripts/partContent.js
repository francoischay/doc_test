var PartContent = React.createClass({displayName: 'PartContent',
  render: function(){
    return (
		React.createElement("div", {className: "part-content"}, 
			React.createElement(ButtonAddFolder, null)
		)
	);
  }
});