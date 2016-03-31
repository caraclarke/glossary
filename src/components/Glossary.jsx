var React = require('react');
var GlossaryItem = require('./GlossaryItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var Glossary = React.createClass({
  
  handleMoveClick: function(event) {
    this.setState({moveThis: moveThis});
    // TODO: when it scrolls to the thing set showDef to true
    for (var i = 0; i < this.props.data.length; i++) {
      var item = this.props.data[i].title.$t;
        document.getElementById(moveThis).scrollIntoView();
        break;
    }
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
