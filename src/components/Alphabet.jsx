var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var NavItem = require('./nav/NavItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Alphabet = React.createClass({
  
  render: function() {
    var alphabetNodes = this.props.data.map(function(data, index) {
      if (data.title.$t.match(regex) == alphId) {
        return <GlossaryItem key={data.title.$t + index} id={data.title.$t} title={data.title.$t} content={data.content.$t} />
      } else {}
    });
    
    return (
      <div> {alphabetNodes} </div>
    );
  }
});

module.exports = Alphabet;