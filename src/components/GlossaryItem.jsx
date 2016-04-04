var React = require('react');

var GlossaryItem = React.createClass({
  
  getInitialState: function() {
    return { moveThis: '' }
  },
  
  onClick: function(element) {
    var stuff = document.getElementById(this.props.id);
    $(stuff).toggleClass('hideMe');
  },
  
  clickMove: function(e) {
    e.preventDefault();
    var thing = document.getElementById(this.props.id);
    $(thing).toggleClass('hideMe');
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
        <h4 className="child" onClick={this.onClick} style={titleStyle}>{this.props.title}</h4>
          <div>
            <p style={defStyle}>{this.props.content}</p>
            <p style={defStyle}><strong>See Also</strong>:  
              {<a onClick={this.clickMove} href={'#' + this.props.seealso}>{this.props.seealso}</a>}
            </p>
          </div>
      </div>
    );
  }
});

module.exports = GlossaryItem;