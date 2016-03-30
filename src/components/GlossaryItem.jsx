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
        { this.state.showDef ? 
          <div>
            <p style={defStyle}>{this.props.content}</p>
            <p>{this.props.seealso}</p>
          </div>
          : null }
      </div>
    );
  }
});

module.exports = GlossaryItem;
// <a href={this.props.seealso}>{this.props.seealso}</a>