var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Glossary = React.createClass({
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      if ((/(\[\[Glossary:\s)/g).test(data.content.$t) == true) {
        var seeAlsoReplace = data.gsx$seealso.$t;
        // get rid of [[Glossary: etc text with regex, replace with see also term
        var replacement = data.content.$t.replace(/(\[\[Glossary:\s)/g, "").replace(/[a-zA-z]+\]([a-zA-Z]+)(\s[a-zA-Z]+)*\]/g, seeAlsoReplace);
        // returning glossary item with edited content
        // console.log(index, data.title.$t, replacement)
        return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={replacement} seealso={<a id={data.gsx$seealso.$t}>{data.gsx$seealso.$t}</a>} />
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
