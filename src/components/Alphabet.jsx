var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var NavItem = require('./nav/NavItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Alphabet = React.createClass({
  
  render: function() {
    var alphabetNodes = this.props.data.map(function(data, index) {
      var seeAlsoReplace = data.gsx$seealso.$t;
      var seeAlsoArray = seeAlsoReplace.trim().split(', ');
      if (data.title.$t.match(regex) == alphId) {
        if ((/(\[\[Glossary:\s)/g).test(data.content.$t) == true) {
          var replacement = data.content.$t.replace(/(\[\[Glossary:\s)(.+\])(.+)\]/g, seeAlsoReplace).replace(/(\,\s)(seealso:\s)+(.+)*/g, '');
          return <GlossaryItem onValueChange={this.handleMoveClick} key={index} id={data.title.$t} title={data.title.$t} content={replacement} seealso={seeAlsoArray} />
        } else {
          return <GlossaryItem key={index} id={data.title.$t} title={data.title.$t} content={data.content.$t} seealso={seeAlsoArray} />
        }
      } else {}
    });
    
    return (
      <div> {alphabetNodes} </div>
    );
  }
});

module.exports = Alphabet;