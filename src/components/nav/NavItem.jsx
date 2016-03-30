var React = require('react');
var Alphabet = require('../Alphabet.jsx');

var NavItem = React.createClass({
  getInitialState: function() {
    return { hover: false };
  },
  mouseOver: function(e) {
    this.setState({hover: true});
  },
  mouseOut: function(e) {
    this.setState({hover: false});
  },
  handleChange: function(e) {
    alphId = this.props.id;
    this.props.onValueChange(alphId)
    // alphId = this.props.id;
    // console.log(alphId);
  },
  
  render: function() {
    return (
      <li onClick={this.handleChange} className={this.state.hover ? "active" : ""} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <a style={this.props.aStyle} to='' id={this.props.id}>{this.props.title}</a>
      </li>
    );
  }
});

module.exports = NavItem;