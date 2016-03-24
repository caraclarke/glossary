var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var glossary = [];

var Glossary = React.createClass({
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      return <GlossaryItem key={data.title.$t + index} title={data.title.$t} content={data.content.$t} />
    });
    
    return (
      <div> {glossaryNodes} </div>
    );
  }
});

module.exports = Glossary;