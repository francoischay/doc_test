var React = require('react');
var Grid = require('./components/Grid.jsx');

require('./scripts');

React.render(
  React.createElement("grid", {
  	parts: ["Ressources", "Print Material", "Host's kit", "Mamassembly's Material"]
  }),
  document.getElementById('main')
);