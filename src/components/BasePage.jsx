var React = require('react');
var NavBar = require('./nav/NavBar.jsx');
var Glossary = require('./Glossary.jsx');
var navLinks = [];

var test = (function(item, index) {
  var alph = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  
  for (var i = 0; i < alph.length; i++) {
    navLinks.push({
      href: alph[i],
      title: alph[i]
    })
  }
}());

var BasePage = React.createClass({

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
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BasePage;