//App functions:
//1.) Ask what book user wants to look up
//2.) Call the Google Books API with the query
//3.) Prints out 5 choices of books with author, title and publishing company
//4.) Program asks user which one to put on the bookshelf
//5.) Program stores those books by pushing the new book onto the end of the array

var request = require('request');
var fs = require('fs');
require('dotenv').config();
var inquirer = require('inquirer');


//Requires the readline module for taking user input
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

queryPrompt();

//Asks what book user wants to look up
function queryPrompt() {
    var book;

    readline.question(`What book are you looking for? `, function(book) {
 
            //calls API with the search string
        callAPI(book);
        readline.close()
    });
    }


//Calls Google books API with the search string and API key
function callAPI(book) {
    var key = process.env.GOOGLE_BOOKS_API; 
    request('https://www.googleapis.com/books/v1/volumes?q=' + book + '&maxResults=5' + '&key=' + key, { json: true }, (err, res, data) => {
  if (err) { return console.log(err); }
  
  data.items.forEach(function(book) {
    console.log(book.volumeInfo.title)
    console.log(book.volumeInfo.authors)
    console.log(book.volumeInfo.publisher)
  }) 
    promptSave(book);
});
}

//Asks user what book to save to a "Reading List"
   var bookSelector = new Promise((resolve, reject) function addBookChoices() {
    var bookChoices=[],   
            bookData = {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            publisher: book.volumeInfo.publisher,
   } 
    bookChoices.push(bookData);
        resolve(bookChoices);
    }
);
        bookSelector.then(function(bookChoices) {
            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which book do you want to save to your reading list?',
                    choices: bookChoices
                    name: 'book'         
        }]).then(function(selected){
            console.log(JSON.stringify(answers, null, '  '));
        });
    });
            


/*
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
