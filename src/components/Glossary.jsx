var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Glossary = React.createClass({
  
  // initial state of variable to move is empty
  getInitialState: function() {
      return { moveThis: '' }
  },
  
  // clickHandler to handle moveThis passed up from GlossaryItem
  handleMoveClick: function(element) {
    
    // get current page location
    var pageLocation = ($(window).scrollTop() + $(window).height());
    
    // set moveThis to moveThis recieved from GlossaryItem
    this.setState({ moveThis: moveThis });
    var moveIt = $('#' + moveThis);
    
    // scrollTop to scroll to new term
    var change = moveIt.offset().top - 200;
    $('html, body').animate({scrollTop: change }, 'slow');
    
    //  detect whether element scrolling to has "hideMe" class
    // remove hideMe class to show or hide description
    var newElement = document.getElementById(moveThis);
    var classCheck = newElement.getAttribute("class");
    newElement.className = "";
    
  },
  
  render: function() {
    
    // map data passed from BasePage, return individual <GlossaryItem />
    var glossaryNodes = this.props.data.map(function(data, index) {
      // get see also terms from google object
      var seeAlsoReplace = data.gsx$seealso.$t;
      
      // split the terms on comma and turn it into an array
      var seeAlsoArray = seeAlsoReplace.replace(/(\s\(.+\))+/g, '').split(', ');
      
      // get rid of any parenthesis for the id, get rid of spaces
      var newTextId = data.title.$t.replace(/(\s\(.+\))+/g, '').split(' ').join('');
      
      // test if the indicator for a see also term appears in the text
      if ((/(\[\[Glossary:\s)/g).test(data.content.$t) == true) {
        // get rid of [[Glossary: etc text with regex, replace with see also term
        var replacement = data.content.$t.replace(/(\[\[Glossary:\s)(.+\])(.+)\]/g, seeAlsoReplace).replace(/(\,\s)(seealso:\s)+(.+)*/g, '');
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

module.exports = Glossary;
