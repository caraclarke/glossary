var React = require('react');

var GlossaryItem = React.createClass({
  
  // initial state of variable to move is empty
  getInitialState: function() {
    return { moveThis: '' }
  },
  
  // onClick to toggle visibility of definition
  onClick: function() {
    
    // get id of parent class
    var parentElement = document.getElementById(this.props.id);
    
    // get name of classes on parent element
    var checkClass = parentElement.getAttribute("class");

    // toggle hideMe class
    // responsible for showing/hiding definition
    // hideMe is in main_style.css sheet in public folder
    if (checkClass == "hideMe") {
      parentElement.className = "";
    } else {
      parentElement.className = "hideMe";
    }
  },
  
  // click handler to help move to see also term when <a /> clicked
  clickMove: function(item, e) {
    
    // get Id of parent element clicked,
    // toggle the class so definition hides when scroll away
    var clickedElement = document.getElementById(this.props.id);
    $(clickedElement).toggleClass('hideMe');
    
    // get rid of spaces in <a /> id and turn to lower case
    // assign to moveThis and pass to parent <Glossary />
    moveThis = item.split(' ').join('').toLowerCase();
    this.props.onValueChange(moveThis);
  },

  render: function()  {
    
    // style for glossary items
    var titleStyle = {
        cursor: 'pointer'
    };
    
    // indent the definition
    var indentDef = {
      marginLeft: 15
    }
    
    // pointer over <a /> tag
    var seeAlsoStyle = {
      cursor: 'pointer',
      paddingRight: 5
    }
    
    // check if array has more than one element
    var multiple = this.props.seealso.length >= 2;
    
    // indent definition left 25px
    var defStyle = {
      paddingRight: 5
    };
    
    // map array of see also terms
    // ternary adds className so if there are mutiple terms a comma is added
    var seeAlsoNodes = this.props.seealso.map(function(item, index) {
      return (
        (multiple) ? <a className="commaList" style={seeAlsoStyle} onClick={this.clickMove.bind(null, item)} key={item + index}>{item}</a> : 
        <a style={seeAlsoStyle} onClick={this.clickMove.bind(null, item)} key={item + index}>{item}</a>
      );
    }, this
  );
    
    return (
      <div className="hideMe" id={this.props.id}>
        <h4 onClick={this.onClick} style={titleStyle}>{this.props.title}</h4>
          <div style={indentDef}>
            <p style={defStyle}>{this.props.content}</p>
            <div><span style={defStyle}><strong>See Also</strong>:</span>
            {seeAlsoNodes}
            </div>
          </div>
      </div>
    );
  }
});

module.exports = GlossaryItem;