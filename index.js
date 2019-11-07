//App functions:
//1.) Ask what book user wants to look up
//2.) Call the Google Books API with the query
//3.) Prints out 5 choices of books with author, title and publishing company
//4.) Program asks user which one to put on the bookshelf
//5.) Program stores those books by pushing the new book onto the end of the array

var request = require('request');
var fs = require('fs');
require('dotenv').config();
console.log(process.env.GOOGLE_BOOKS_API);

//Requires the readline module for taking user input
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

//Asks what book user wants to look up
function queryPrompt() {
    var book;

    readline.question(`What book are you looking for? `, function(book) {
    //calls API with the search string
    console.log(book);
    callAPI();
    readline.close()
    })
}

//Calls Google books API with the search string and API key
/*
function callAPI() {
    var key = process.env.GOOGLE_BOOKS_API; 
    console.log('Your API key is: ', process.env.GOOGLE_BOOKS_API)
    request('https://www.googleapis.com/books/v1//volumes?q=' + book + '&fields=title, author, publisher&maxResults=5' + '&key=' + key, { json: true }, (err, res, data) => {
  if (err) { return console.log(err); }
  console.log(data);
 // promptSave();
});
}

//Asks user what book to save to a "Reading List"
function promptSave() {
    readline.question(`Which book do you want to save in your reading list? `, (book) => {
        //calls function to save book to reading list
        saveReadingList();
        readline.close()
    })
}

//Takes that response and pushes the book onto an array
function saveReadingList() {
    let readingList = [];
    readingList.push(1);
    viewReadingList();
    
}

//Gives user option to view "Reading List"
function viewReadingList() {
    readline.question(`Do you want to view your reading list? Enter Y or N `, (book) => {
        if ('y') {
            console.log(readingList);
        }
       else {
           initialPrompt();
       }
        readline.close()
        initialPrompt();
    })
}
*/
