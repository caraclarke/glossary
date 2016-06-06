# Glossary
---

The Glossary is an alphabetical list of Computer Science terms. These terms display as just the title and when clicked, reveal the definition. They also display a link to any related term that, when clicked, brings the user to that new term and reveals the definition.

The glossary can also be filtered alphabetically using the navbar located at the top of the screen. If a term has a related or "see also" term that does not appear in the same filter, the glossary will re-render all of the terms and then go to the appropriate term.

The project currently gets the terms as a JSON object from the Google Spreadsheets API using AJAX.

####To view google spreadsheet with terms

The spreadhseet is set up with 3 columns:

1. Term
2. Definition
3. See Also - the word(s) in the See Also column must be the **term name** of the word being referred to or the link will not work.

If you want to edit please contact me (Cara Clarke) for editing permissions at cara.clarke8@gmail.com

https://docs.google.com/spreadsheets/d/1cupv1Po0tGnQ60YPCkKZ9ARqQJb-4diOfTZ07AnAz8s/edit?usp=sharing

####Features

- Display all terms
- Link between terms
- Filter by letter

####Installation

Install the project by:

```
$ git clone git@github.com:caraclarke/glossary.git
$ cd glossary/
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
