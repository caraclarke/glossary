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
  
  handleMoveClick: function(element) {
    var pageLocation = ($(window).scrollTop() + $(window).height());
    this.setState({
      moveThis: moveThis,
    });
    var moveIt = '#' + moveThis;
    var change = $(moveIt).offset().top - 200;
    $('html, body').animate({scrollTop: change }, 'slow');
    if (pageLocation < change) {
      // this.setState({ showDef: true });
      // showDef = true;
      // console.log(showDef);
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
