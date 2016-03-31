var React = require('react');
var NavItem = require('./nav/NavItem.jsx');
var Glossary = require('./Glossary.jsx');
var Alphabet = require('./Alphabet.jsx');
var GlossaryItem = require('./GlossaryItem.jsx');
var regex= new RegExp('^[a-zA-Z]');

var BasePage = React.createClass({
  
  getInitialState: function() {
      return  {
        data: [],
        navLinks: [],
        alphId: '',
        moveThis: '',
        showDef: false
      }
  },
  
  componentDidMount: function() {
    $.ajax({
      url: 'https://spreadsheets.google.com/feeds/list/1cupv1Po0tGnQ60YPCkKZ9ARqQJb-4diOfTZ07AnAz8s/default/public/values?alt=json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ data: data.feed.entry });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('url: ', this.props.url);
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    
    var alph = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    var tempArray = [];
    
    for (var i = 0; i < alph.length; i++) {
      tempArray.push({
        href: alph[i],
        title: alph[i],
        id: alph[i]
      })
    }
    this.setState({ navLinks: tempArray });

  },
  
  handleChildClick: function(event) {
    this.setState({ alphId: alphId });
  },
  
  resetAllTerms: function(event) {
    this.setState({ alphId: '' });
  },

  render: function() {
    
    var style = {
      paddingTop: 15
    }
    
    var navStyle = {
      WebkitBoxShadow: "0 0 4px rgba(0,0,0.4)",
      MozBoxShadow: "0 0 4px rgba(0,0,0.4)",
      boxShadow: "0 0 4px rgba(0,0,0.4)",
      borderRadius: 0
    };
    
    var titleStyle = {};
    var linkStyle = {}
    
    if (this.props.bgColor)
      navStyle.background = this.props.bgColor;
    
    if (this.props.titleColor)
      titleStyle.color = this.props.titleColor;
      
    if (this.props.linkColor)
      linkStyle.color = this.props.linkColor;

    var createLinkItem = this.state.navLinks.map(function(item, alphId, index) {
      return <NavItem onValueChange={this.handleChildClick} aStyle={linkStyle} key={item.title + index} id={item.id} title={item.title} />
    }.bind(this));
    
    return(
      <div>
        <nav style={navStyle} className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a style={titleStyle} className="navbar-brand" onClick={this.resetAllTerms}>Glossary</a>
          </div>
          <div className="collapse navbar-collapse" id="nav-collapse">
            <ul className="nav navbar-nav">{createLinkItem}</ul>
          </div>
        </nav>
        <div className="container" style={style}>
          <div className="row">
            <div className="col-sm-10 col-md-10">
            { this.state.alphId ? <Alphabet data={this.state.data} /> : <Glossary  data={this.state.data} /> }
            </div>
          </div>
        </div>
      </div>
    );
  }
  
});

module.exports = BasePage;