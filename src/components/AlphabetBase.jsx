var React = require('react');
var Alphabet = require('./Alphabet.jsx');

var AlphabetBase = React.createClass({
  getInitialState: function() {
      return  { data: [] }
  },
  
  componentDidMount: function() {
    $.ajax({
      url: 'https://spreadsheets.google.com/feeds/list/1cupv1Po0tGnQ60YPCkKZ9ARqQJb-4diOfTZ07AnAz8s/default/public/values?alt=json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.feed.entry});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('url: ', this.props.url);
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  render: function() {

    return(
      <Alphabet data={this.state.data} />
    );
  }
});

module.exports = AlphabetBase;