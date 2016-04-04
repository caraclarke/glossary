var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var NavItem = require('./nav/NavItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Alphabet = React.createClass({
  
  render: function() {
    var alphabetNodes = this.props.data.map(function(data, index) {
      // console.log(data);
      if (data.title.$t.match(regex) == alphId) {
        if ((/(\[\[Glossary:\s)/g).test(data.content.$t) == true) {
          var seeAlsoReplace = data.gsx$seealso.$t;
          var replacement = data.content.$t.replace(/(\[\[Glossary:\s)(.+\])(.+)\]/g, seeAlsoReplace).replace(/(\,\s)(seealso:\s)+(.+)*/g, '');
          return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={replacement} seealso={data.gsx$seealso.$t} />
        } else {
          return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={data.content.$t} seealso={data.gsx$seealso.$t} />
        }
      } else {}
    });
    
    return (
      <div> {alphabetNodes} </div>
    );
  }
});

module.exports = Alphabet;