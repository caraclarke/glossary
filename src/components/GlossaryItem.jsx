var React = require('react');
var Link = require('react-router').Link;

var GlossaryItem = React.createClass({

  render: function() {
    return (
      <li>{this.props.title}</li>
    );
  }
});

module.exports = GlossaryItem;