//App functions:
//1.) Ask what book user wants to look up
//2.) Call the Google Books API with the query
//3.) Prints out 5 choices of books with author, title and publishing company
//4.) Program asks user which one to put on the bookshelf
//5.) Program stores those books by pushing the new book onto the end of the array

const request = require('request');

//Requires the readline module for taking user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

//Asks what book user wants to look up
let book;

readline.question(`What book are you looking for? `, (book) => {
    //calls API with the search string
    callAPI();
    readline.close()
})

//Calls Google books API with the search string and API key
callAPI()=> {
    let key = AIzaSyAbFQrChlhltMow5bHhw3IGd3VwO71rzss;

    request('https://www.googleapis.com/books/v1//volumes?q=' + book + '&fields=title, author, publisher&maxResults=5' + '&key=' + key, { json: true }, (err, res, data) => {
  if (err) { return console.log(err); }
  console.log(data);
});
}

//Asks user what book to save to a "Reading List"

//Takes that response and pushes the book onto an array

//Gives user option to view "Reading List"

