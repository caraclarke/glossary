var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');

var Index = React.createClass({
  
  // initial state of variable to move is empty
  getInitialState: function() {
      return { 
        moveThis: ''
      }
  },
  
  // clickHandler to handle moveThis passed up from GlossaryItem
  handleMoveClick: function(element) {
    this.props.onClick(moveThis);
  },
  
  render: function() {
    
    // loop through this.props.data
    // extract terms using regex
    // if there is more than one term, replace both and reinsert
    
    // // map data passed from BasePage, return individual <GlossaryItem />
    var glossaryNodes = this.props.data.map(function(data, index) {
      
      // get see also terms from google object
      var seeAlsoReplace = data.gsx$seealso.$t;
      
      // split the terms on comma and turn it into an array
      var seeAlsoArray = seeAlsoReplace.replace(/(\s\(.+\))+/g, '').split(', ');
      
      // get rid of any parenthesis for the id, get rid of spaces, turn lowercase
      var newTextId = data.title.$t.replace(/(\s\()/g, '').replace(/(\))/g, '').replace(/\W+/g, '').split(' ').join('').toLowerCase();
      console.log(newTextId);
      
      // test if the indicator for a see also term appears in the text
      if ((/(\[\[Glossary:\s)/g).test(data.content.$t) == true) {
        // get rid of [[Glossary: etc text with regex, replace with see also term
        var replacement = data.content.$t.replace(/\[(.*?)\]/g, '').replace(/(\B\]|\b\])/g, '').replace(/(\,\s)(seealso:\s)+(.+)*/g, '');
        // returning glossary item with edited content
        return <GlossaryItem onValueChange={this.handleMoveClick} key={index} id={newTextId} title={data.title.$t} content={replacement} seealso={seeAlsoArray} />
      } else {
        return <GlossaryItem onValueChange={this.handleMoveClick} key={index} id={newTextId} title={data.title.$t} content={data.content.$t} seealso={seeAlsoArray} />
      }
    }.bind(this));
    
    return (
      <div> {glossaryNodes} </div>
    );
  }
});

module.exports = Index;
