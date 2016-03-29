var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var Link = require('react-router').Link;
var glossary = [];

var Glossary = React.createClass({
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      var dataContent = data.content.$t;
      if ((/(\[\[Glossary:\s)/g).test(dataContent) == true) {
        var refTerm = data.gsx$seealso.$t;
        console.log(refTerm);
        var replacement = dataContent.replace(/(\[\[Glossary:\s)/g, "").replace(/\]([a-zA-Z]+)(\s[a-zA-Z]+)*\]/g, "");
        return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={replacement} />
      } else {
        return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={data.content.$t} />
      }
    });
    // we can now access the see also term only when it shows up somewhere because its inside the conditional that equals true
    // we dont have glossary item set up to put it anywhere
    // need to leave replacement so [[Glossary: stuff doesnt show up
    
    return (
      <div> {glossaryNodes} </div>
    );
  }
});

module.exports = Glossary;