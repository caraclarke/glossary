var React = require('react');
var Link = require('react-router').Link;
var Alphabet = require('../Alphabet.jsx');

var NavItem = React.createClass({
  getInitialState: function() {
    return { hover: false, alphId: '' };
  },
  mouseOver: function(e) {
    this.setState({hover: true});
  },
  mouseOut: function(e) {
    this.setState({hover: false});
  },
  onClick: function() {
    // alphId = this.props.id;
    this.setState({ alphId: this.props.id });
  },
  
  render: function() {
    return (
      <li onClick={this.onClick} className={this.state.hover ? "active" : ""} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <a style={this.props.aStyle} to='' id={this.props.id}>{this.props.title}</a>
      </li>
    );
  }
});

module.exports = NavItem;