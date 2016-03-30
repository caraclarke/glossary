var React = require('react');
var NavBar = require('./nav/NavBar.jsx');
var Glossary = require('./Glossary.jsx');
var Alphabet = require('./Alphabet.jsx');
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

var BasePage = React.createClass({
  
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
  
  // <Alphabet data={this.state.data} />

  render: function() {
    
    var style = {
      paddingTop: 15
    }
    
    return(
      <div>
        <NavBar bgColor="#fff" titleColor="#3097d1" linkColor="" navData={navLinks} />
        <div className="container" style={style}>
          <div className="row">
            <div className="col-sm-10 col-md-10">
              <Glossary data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BasePage;