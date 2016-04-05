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
  
  clickMove: function() {
    var clickedElement = document.getElementById(this.props.id);
    $(clickedElement).toggleClass('hideMe');
    moveThis = this.props.seealso;
    this.props.onValueChange(moveThis);
  },

  render: function()  {
    
    var titleStyle = {
        cursor: 'pointer'
    };
    
    var defStyle = {
      paddingLeft: 25
    };
    
    return (
      <div className="hideMe" id={this.props.id}>
        <h4 onClick={this.onClick} style={titleStyle}>{this.props.title}</h4>
          <div>
            <p style={defStyle}>{this.props.content}</p>
            <p style={defStyle}><strong>See Also</strong>:  
            {this.props.seealso.map(function(item, index) {
              return <a onClick={this.clickMove} key={index} href={'#'+item}>{item}</a>
            })}
            </p>
          </div>
      </div>
    );
  }
});

module.exports = GlossaryItem;