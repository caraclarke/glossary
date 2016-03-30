var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var Link = require('react-router').Link;
var glossary = [];

var Glossary = React.createClass({
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      var dataContent = data.content.$t;
      if ((/(\[\[Glossary:\s)/g).test(dataContent) == true) {
        var replacement = dataContent.replace(/(\[\[Glossary:\s)/g, "").replace(/\]([a-zA-Z]+)(\s[a-zA-Z]+)*\]/g, "");
        return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={replacement} seealso={data.gsx$seealso.$t} />
      } else {
        return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={data.content.$t} seealso={data.gsx$seealso.$t} />
      }
    });
    
    return (
      <div> {glossaryNodes} </div>
    );
  }
});

module.exports = Glossary;