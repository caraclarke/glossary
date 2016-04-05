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
    
    var clickedElement = document.getElementById(this.props.id);
    $(clickedElement).toggleClass('hideMe');
    
    moveThis = item;
    console.log(moveThis);
    this.props.onValueChange(moveThis);
  },

  render: function()  {
    
    var titleStyle = {
        cursor: 'pointer'
    };
    
    var defStyle = {
      paddingLeft: 25
    };
    
    var seeAlsoNodes = this.props.seealso.map(function(item, index) {
      return (
        <a onClick={this.clickMove.bind(null, item)} key={item + index} href={'#'+item}>{item}</a>
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