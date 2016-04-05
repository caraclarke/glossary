var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Glossary = React.createClass({
  
  getInitialState: function() {
      return { moveThis: '' }
  },
  
  handleMoveClick: function(element) {
    var pageLocation = ($(window).scrollTop() + $(window).height());
    
    this.setState({ moveThis: moveThis });
    var moveIt = '#' + moveThis;
    
    var change = $(moveIt).offset().top - 200;
    console.log('change is', change);
    $('html, body').animate({scrollTop: change }, 'slow');
    
      var newElement = document.getElementById(moveThis);
      var classCheck = newElement.getAttribute("class");
      
      if (classCheck == "hideMe") {
        newElement.className = "";
      } else {
        newElement.className = "hideMe";
      }
  //  this.setState({ moveThis: '' });
  },
  
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      var seeAlsoReplace = data.gsx$seealso.$t;
      var seeAlsoArray = seeAlsoReplace.replace(/(\s\(.+\))+/g, '').split(', ');
      var newTextId = data.title.$t.replace(/(\s\(.+\))+/g, '')
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
