var React = require('react');
var Link = require('react-router').Link;
var Alphabet = require('../Alphabet.jsx');
var navLinks = [];

var test = (function(item, index) {
  var alph = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  
  for (var i = 0; i < alph.length; i++) {
    navLinks.push({
      href: alph[i],
      title: alph[i],
      id: alph[i]
    })
  }
}());

var NavItem = React.createClass({
  getInitialState: function() {
    return {hover: false};
  },
  mouseOver: function(e) {
    this.setState({hover: true});
  },
  mouseOut: function(e) {
    this.setState({hover: false});
  },
  onClick: function() {
    console.log(navLinks);
  },
  
  render: function() {
    return (
      <li onClick={this.onClick} className={this.state.hover ? "active" : ""} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <Link style={this.props.aStyle} to='' id={this.props.id}>{this.props.title}</Link>
      </li>
    );
  }
});

module.exports = NavItem;