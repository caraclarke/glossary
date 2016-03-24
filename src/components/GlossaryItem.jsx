var React = require('react');
var Link = require('react-router').Link;

var GlossaryItem = React.createClass({

  render: function() {
    return (
      <div>
        <h4>{this.props.title}</h4>
        <p>{this.props.content}</p>
      </div>
    );
  }
});

module.exports = GlossaryItem;