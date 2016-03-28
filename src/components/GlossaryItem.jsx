var React = require('react');
var Link = require('react-router').Link;

var GlossaryItem = React.createClass({
  getInitialState: function() {
      return { showDef: false }
  },
  
  onClick: function() {
    if (this.state.showDef == false ){
      this.setState({showDef: true});
    } else {
      this.setState({ showDef: false })
    }
  },

  render: function()  {
    
    var titleStyle = {
        cursor: 'pointer'
    };
    
    var defStyle = {
      paddingLeft: 25
    };
    
    return (
      <div>
        <h4 onClick={this.onClick} style={titleStyle}>{this.props.title}</h4>
        { this.state.showDef ? <p style={defStyle}>{this.props.content}</p> : null }
      </div>
    );
  }
});

module.exports = GlossaryItem;