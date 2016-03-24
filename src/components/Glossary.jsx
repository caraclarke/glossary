var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var glossary = [];

var Glossary = React.createClass({
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      return <GlossaryItem key={data.title.$t + index} title={data.title.$t} />
    });
    
    return (
      <ul>{glossaryNodes}</ul>
    );
  }
});

module.exports = Glossary;