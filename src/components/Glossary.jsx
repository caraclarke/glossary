var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var glossary = [];

var Glossary = React.createClass({
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      var dataContent = data.content.$t
      var replacement = dataContent.replace(/(\[\[Glossary:\s)/g, "").replace(/\]([a-zA-Z]+)(\s[a-zA-Z]+)*\]/g, '');
      return <GlossaryItem key={data.title.$t + index} id={data.title.$t} title={data.title.$t} content={replacement} />
    });
    
    return (
      <div> {glossaryNodes} </div>
    );
  }
});

module.exports = Glossary;