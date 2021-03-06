var React = require('react');

var NavItem = React.createClass({
  
  getInitialState: function() {
    return { hover: false };
  },
  
  // mouseOver and mouseOut changing state of hover to change style
  mouseOver: function(e) {
    this.setState({hover: true});
  },
  
  mouseOut: function(e) {
    this.setState({hover: false});
  },
  
  // click handler to pass alphId up to BasePage to filter Glossary
  handleChange: function(e) {
    alphId = this.props.id;
    this.props.onValueChange(alphId)
  },
  
  render: function() {
    return (
      <li onClick={this.handleChange} className={this.state.hover ? "active" : ""} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <a style={this.props.aStyle} id={this.props.id}>{this.props.title}</a>
      </li>
    );
  }
});

module.exports = NavItem;