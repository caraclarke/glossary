var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Glossary = React.createClass({
  
  getInitialState: function() {
      return {
        moveThis: '',
        showDef: false
      }
  },
  
  handleMoveClick: function(element, showDef) {
    var pageLocation = ($(window).scrollTop() + $(window).height());
    console.log(pageLocation);
    this.setState({
      moveThis: moveThis,
      // showDef: true // this is setting showDef as true for element being clicked not element it is scrolling to
    });
    var moveIt = '#' + moveThis;
    // TODO: when it scrolls to the thing set showDef to true
    // TODO: in alphabet needs to reset to full page then go click
    var change = $(moveIt).offset().top - 200;
    $('html, body').animate({scrollTop: change }, 'slow');
    if (pageLocation < change) {
      this.setState({ showDef: true });
    } else {}
  },
  
  render: function() {
    
    var glossaryNodes = this.props.data.map(function(data, index) {
      if ((/(\[\[Glossary:\s)/g).test(data.content.$t) == true) {
        var seeAlsoReplace = data.gsx$seealso.$t;
        // get rid of [[Glossary: etc text with regex, replace with see also term
        var replacement = data.content.$t.replace(/(\[\[Glossary:\s)/g, "").replace(/[a-zA-z]+\]([a-zA-Z]+)(\s[a-zA-Z]+)*\]/g, seeAlsoReplace);
        // returning glossary item with edited content
        return <GlossaryItem onValueChange={this.handleMoveClick} key={index} id={data.title.$t} title={data.title.$t} content={replacement} seealso={data.gsx$seealso.$t} />
      } else {
        return <GlossaryItem onValueChange={this.handleMoveClick} key={index} id={data.title.$t} title={data.title.$t} content={data.content.$t} seealso={data.gsx$seealso.$t} />
      }
    }.bind(this));
    
    return (
      <div> {glossaryNodes} </div>
    );
  }
});

module.exports = Glossary;
