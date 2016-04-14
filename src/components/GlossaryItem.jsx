var React = require('react');

var GlossaryItem = React.createClass({
  
  // initial state of variable to move is empty
  getInitialState: function() {
    return {
      moveThis: '',
      hover: false
    }
  },
  
  // mouseOver and mouseOut changing state of hover to change style
  mouseOver: function(e) {
    this.setState({ hover: true });
  },
  
  mouseOut: function(e) {
    this.setState({ hover: false });
  },
  
  // onClick to toggle visibility of definition
  onClick: function(event) {
    
    event.stopPropagation();
    // get id of parent class
    var parentElement = '#' + this.props.id;
    
    // toggle hideMe class
    // responsible for showing/hiding definition
    // hideMe is in main_style.css sheet in public folder
    $(parentElement).toggleClass('hideMe');
  },
  
  // click handler to help move to see also term when <a /> clicked
  clickMove: function(item, e) {
    
    // get rid of spaces in <a /> name, turn to lower case and get rid of non-word characters
    // assign to moveThis and pass to parent <Glossary />
    moveThis = item.replace(/(\s\()/g, '').replace(/(\))/g, '').replace(/\W+/g, '').split(' ').join('').toLowerCase();
    
    this.props.onValueChange(moveThis);
  },

  render: function()  {
    
    // style for glossary items
    var titleStyle = {
        marginTop: 25,
        cursor: 'pointer'
    };
    
    var hoverTitle = {
      marginTop: 25,
      cursor: 'pointer',
      color: '#23BAD8'
    };
    
    // indent the definition
    var indentDef = {
      backgroundColor: '#eee',
      padding: 15,
      marginBottom: 25
    };
    
    // pointer over <a /> tag
    var seeAlsoStyle = {
      cursor: 'pointer',
      paddingRight: 5
    };
    
    // check if array has more than one element
    var multiple = this.props.seealso.length >= 2;
    
    // indent definition left 5px
    var defStyle = {
      paddingRight: 5
    };
    
    var activeStyle = {
      color: '#23BAD8'
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
      <div className="hideMe showDefTitle" id={this.props.id}>
        <h4 onClick={this.onClick} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} style={this.state.hover ? hoverTitle : titleStyle}>{this.props.title}</h4>
          <div className="definitionStyle" style={indentDef}>
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