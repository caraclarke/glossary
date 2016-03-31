var React = require('react');

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
  
  clickMove: function(e) {
    // using this.props.seealso we get the name of where we want to go
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
      <div>
        <h4 id={this.props.title} onClick={this.onClick} style={titleStyle}>{this.props.title}</h4>
        { this.state.showDef ? 
          <div>
            <p style={defStyle}>{this.props.content}</p>
            <p style={defStyle}><strong>See Also</strong>:  
              {<a onClick={this.clickMove} href={'#' + this.props.seealso} id={this.props.seealso}>{this.props.seealso}</a>}
            </p>
          </div>
          : null }
      </div>
    );
  }
});

module.exports = GlossaryItem;