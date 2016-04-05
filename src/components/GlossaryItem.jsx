var React = require('react');

var GlossaryItem = React.createClass({
  
  getInitialState: function() {
    return {
      moveThis: ''
    }
  },
  
  onClick: function() {
    var parentElement = document.getElementById(this.props.id);
    var checkClass = parentElement.getAttribute("class")
    if (checkClass == "hideMe") {
      parentElement.className = "";
    } else {
      parentElement.className = "hideMe";
    }
  },
  
  clickMove: function(item, e) {
    e.preventDefault();
    var clickedElement = document.getElementById(this.props.id);
    $(clickedElement).toggleClass('hideMe');
    // this.props.seealso will make it have the correct action
    // the problem is when you click a link thats part of an array seealso is the whole array
    // we need to know how to find which one was clicked
    moveThis = item;
    this.props.onValueChange(moveThis);
  },

  render: function()  {
    
    var self = this;
    
    var titleStyle = {
        cursor: 'pointer'
    };
    
    var defStyle = {
      paddingLeft: 25
    };
    
    var seeAlsoNodes = this.props.seealso.map(function(item, index) {
      return (
        <a onClick={self.clickMove.bind(null, item)} key={item + index} href={'#'+item} id={item}>{item}</a>
      );
    }, this
  );
    
    return (
      <div className="hideMe" id={this.props.id}>
        <h4 onClick={this.onClick} style={titleStyle}>{this.props.title}</h4>
          <div>
            <p style={defStyle}>{this.props.content}</p>
            <div style={defStyle}><strong>See Also</strong>:  
            {seeAlsoNodes}
            </div>
          </div>
      </div>
    );
  }
});

module.exports = GlossaryItem;