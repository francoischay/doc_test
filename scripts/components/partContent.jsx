var React = require('react');
var ButtonAddFolder = require('./buttonAddFolder.jsx');

var PartContent = React.createClass({
  render: function(){
    return (
		<div className="part-content">
			<ButtonAddFolder />
		</div>
	);
  }
});

module.exports = PartContent;