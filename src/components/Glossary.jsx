var React = require('react');
var NavItem = require('./nav/NavItem.jsx');
var Index = require('./Index.jsx');
var regex= new RegExp('^[a-zA-Z]');
var filter;

var Glossary = React.createClass({
  
  // data from google spreadsheet, navLinks for navbar, 
  // alphId to filter, moveThis to scroll to seealso term
  getInitialState: function() {
      return  {
        data: [],
        navLinks: [],
        alphId: '',
        moveThis: '',
        constantArray: []
      }
  },
  
  componentWillMount: function() {
    // split alphabet into array
    var alph = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    var tempArray = [];
    
    // loop through alphabet and push into temp array with keys and values
    alph.map(function(item, index) {
      tempArray.push({
        title: item,
        id: item,
        key: item + index
      })
    });
    
    $.ajax({
      url: 'https://spreadsheets.google.com/feeds/list/1cupv1Po0tGnQ60YPCkKZ9ARqQJb-4diOfTZ07AnAz8s/default/public/values?alt=json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        // set state of navLinks from temporary array
        // set data to data array recieved from google spreadsheet
        this.setState({ 
          navLinks: tempArray,
          data: data.feed.entry,
          constantArray: data.feed.entry,
          moveThis: ''
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('url: ', this.props.url);
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    
    $('html').click(function() {
        $('.showDefTitle').addClass('hideMe');
    });

  },
  
  componentDidUpdate: function(element) {
    
    if (!moveThis) {
      return;
    } else {
      
      var moveIt = $('#' + moveThis);
      
      // get current pageLocation and the change that needs to be made to move to term
      var pageLocation = ($(window).scrollTop() + $(window).height());
      var change = moveIt.offset().top - 200;
      
      $('html, body').animate({scrollTop: change }, 'slow');
      
      // detect whether element scrolling to has "hideMe" class
      // remove hideMe class to show or hide description
      var newElement = document.getElementById(moveThis);
      $(newElement).toggleClass('hideMe');
    }
  },
  
  // set state in basePage of alphId
  handleChildClick: function(event) {
    
    this.setState({ alphId: alphId });

    var alphArray = [];
    // reset data to whole data array from google everytime
    this.state.data = this.state.constantArray;
    
    // mapping data array and pushing objects that start with that letter
    this.state.data.map(function(item, index){
      // check first letter of title against alphId
      // push to alphArray if it matches
      if (item.title.$t.match(regex) == alphId) {
        alphArray.push(item);
      } else {
        return false;
      }
      
    }.bind(this));
    
    // if no letters start with alphId render string
    alphArray.length == 0 ? $('#noFilterMatch').removeClass('hiddenMessage') : $('#noFilterMatch').addClass('hiddenMessage');
    
    // set this.state.data to the array that matches alphId
    this.state.data = alphArray;
    
    // scroll to top of the page when switch to filtered page
    $("html, body").animate({ scrollTop: 0 }, "slow");
  },
  
  // click Index title to get rid of alphId and reset it to showing all terms
  resetAllTerms: function(event) {
    alphId = '';
    this.setState({ data: this.state.constantArray });
  },
  
  scrollToTerm: function(element) {
    
    // set data to full array, set moveThis to moveThis recieved from Index
    alphId = '';
    this.setState({
      data: this.state.constantArray,
      moveThis: moveThis
    });
    
  },

  render: function() {
    
    // styling for navbar below
    // can pass in colors in main.jsx <BasePage />
    var style = {
      paddingTop: 15
    }
    
    var navStyle = {
      WebkitBoxShadow: "0 0 4px rgba(0,0,0.4)",
      MozBoxShadow: "0 0 4px rgba(0,0,0.4)",
      boxShadow: "0 0 4px rgba(0,0,0.4)",
      borderRadius: 0
    };
    
    var titleStyle = {
      cursor: 'pointer'
    };
    
    var linkStyle = {
      cursor: 'pointer'
    }
    
    // three if statements below changing nav background, link (navLink) and title colors
    if (this.props.bgColor)
      navStyle.background = this.props.bgColor;
    
    if (this.props.titleColor)
      titleStyle.color = this.props.titleColor;
      
    if (this.props.linkColor)
      linkStyle.color = this.props.linkColor;

    // map navLinks, return <NavItem /> to be rendered
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
            <div className="col-xs-10">
              <Index onClick={this.scrollToTerm} data={this.state.data} constantArray={this.state.constantArray} />
              
              <div id="noFilterMatch" className="hiddenMessage">
                <h2>No terms match this filter</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
});

module.exports = Glossary;