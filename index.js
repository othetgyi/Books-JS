//App functions:

var request = require('request');
var fs = require('fs');
require('dotenv').config();


function main(){
    //1.) Ask what book user wants to look up
    getUserInput(validateInput);

    //3.) Prints out 5 choices of books with author, title and publishing company
   // bookChoices();
    //4.) Program asks user which one to put on the bookshelf
    //savedBook();
    //5.) Program stores those books by pushing the new book onto the end of the array
    //viewReadingList();
}

//Requires the readline module for taking user input
var readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

//Asks what book the user wants to look up
var getUserInput = function (callback) {
    readline.question(`What book are you looking for? `, callback) 
    //add if else statement if user just hits enter
  };
//Validates input 
var validateInput = function (callback){
    if (callback){
        console.log(`You are looking for ${callback} books.`)
    } else {
        console.log('Please enter one or more keywords for the books you\'re looking for.')
    }
}

//Calls Google books API with the search string and API key
/*
function callAPI(searchTerm) {
   
    var key = process.env.GOOGLE_BOOKS_API; 
    request('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&maxResults=5' + '&key=' + key, { json: true }, (err, res, data) => {
    
  if (err) { 
      console.log(err); 
      console.log('The API call has failed. Please try again.');
    } else {
         
  data.items.forEach(function(book, index) {
    console.log(book.volumeInfo.title)
    console.log(book.volumeInfo.authors)
    console.log(book.volumeInfo.publisher)
    console.log(index);
  }); 
    //bookChoices(data);
//})
}})};

//callAPI(searchTerm); 

/*

//Asks user what book to save to the reading list
function bookChoices(data) {
    readline.question(`Which books would you like to save to your reading list? Type one of the numbers above. `, function(input) {
        var book = data.items[input];
        console.log(`You've chosen ${input}.`);
        console.log(book.volumeInfo.title);
        console.log(book.volumeInfo.authors);
        console.log(book.volumeInfo.publisher);
       // readline.close();
        saveBook(book);
});
}

    bookChoices(data);

//Saves selected book to a JSON file
function saveBook(book){
    var readingList = [];
    readingList.push(book);
    fs.writeFile( "readinglist.json", JSON.stringify(readingList), "utf8", function(){});
    viewReadingList();
}
    //add new book to it
    //save new list

//Gives user option to view "Reading List"
function viewReadingList() {
    readline.question(`Do you want to view your reading list? Enter Y or N `, function(choiceInput) {
        if (choiceInput="Y") {
            console.log(`You have chosen to see your reading list.`);
            var bookData = fs.readFilesSync('readinglist.json');
            var readingList = JSON.parse(bookData);
            console.log(readingList);
        }   else {
           queryPrompt();
       }
        readline.close();
    });
}
*/
main();