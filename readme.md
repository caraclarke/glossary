#Codiscope glossary
---

The Codiscope Glossary is an alphabetical list of terms that appear in our courses. These terms display as just the title and when clicked, reveal the definition. They also display a link to any related term that, when clicked, brings the user to that new term and reveals the definition.

The glossary can also be filtered alphabetically using the navbar located at the top of the screen. If a term has a related or "see also" term that does not appear in the same filter, the glossary will re-render all of the terms and then go to the appropriate term.

The project currently gets the terms as a JSON object from the Google Spreadsheets API using AJAX.

```
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
```

####To view google spreadsheet with terms

The spreadhseet is set up with 3 columns:

1. Term
2. Definition
3. See Also - the word(s) in the See Also column must be the **term name** of the word being referred to or the link will not work.

If you want to edit please contact me (Cara Clarke) for editing permissions

https://docs.google.com/spreadsheets/d/1cupv1Po0tGnQ60YPCkKZ9ARqQJb-4diOfTZ07AnAz8s/edit?usp=sharing

####Features

- Display all terms
- Link between terms
- Filter by letter

####Installation

Install the project by:

```
$ git clone git@github.com:caraclarke/glossary.git
$ cd codiscope-glossary/
$ npm install

```  

####To view page locally

```
$ npm start
// change to new window
$ cd public/
$ ruby -run -e httpd . -p5000

```

####Where changes could/should be made

- The AJAX call that gets the information is in componentWillMount function in Glossary.jsx
- The glossaryNodes map function that is in the return function of Index.jsx will need to be updated for any changes in the JSON object
- The background color and "title" color of the navbar are set in main.jsx
