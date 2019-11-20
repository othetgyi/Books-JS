//16/11 notes: Program will ask for input but then prints out the argument of validateInput in function main. Also, it ignores the else if the user just hits enter without typing in anything. The third problem is it says that "callback()" is not a function.

var request = require('request');
var fs = require('fs');
require('dotenv').config();


 //1.) Ask what book user wants to look up
    //getUserInput(validateInput);
      //3.) Prints out 5 choices of books with author, title and publishing company
   // bookChoices();
    //4.) Program asks user which one to put on the bookshelf
    //savedBook();
    //5.) Program stores those books by pushing the new book onto the end of the array
    //viewReadingList();

function main(){
    getSearchTerm(function(searchTerm){
        validateSearchTerm(searchTerm, function(searchTerm){
            callAPI(searchTerm, function(data){
                filterResults(data, function(data){
                    saveBook(data, function(data){
                        printIt(data);
                    });
                });
            });
        });
    });
}

//Requires the readline module for taking user input
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Asks what kind of book the user wants to look up
var getSearchTerm = function(callback) {
    rl.question('What kinds of books are you looking for? ', function(searchTerm) {
        callback(searchTerm);
        });
}

//Validates user input 
var validateSearchTerm = function(searchTerm, callback){
    if (searchTerm !== '' && searchTerm !== null){
        console.log(`Here is a list of five books on ${searchTerm}.`)
        callback(searchTerm);
        } else {
        rl.question('Please enter one or more keywords for the books you\'re looking for.', function(searchTerm){
            callback(searchTerm);
        });
        }
    }

//Calls Google books API with the search string and API key
var callAPI = function(searchTerm, callback) {
    var key = process.env.GOOGLE_BOOKS_API; 
    request('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&maxResults=5' + '&key=' + key, { json: true }, (err, res, data) => {
    if (err) { 
      console.log(err); 
      console.log('The API call has failed. Please try again.');
    } else {
    callback(data);
  };  
})};

var filterResults = function(data, callback) {
    data.items.forEach(function(book, index) {
        console.log(book.volumeInfo.title)
        console.log(book.volumeInfo.authors)
        console.log(book.volumeInfo.publisher)
        console.log(index);
        callback(data);
    });
}

//Placeholder function to check other functions work properly
var printIt = function(/*searchTerm*/) {
    console.log('App has finished');
}
/*
//Asks user what book to save to the reading list
function saveBook(data, callback) {
    rl.question(`Which book do you want to save to your reading list? Type the number that corresponds to it. `, function(number) {
        if (number != '' || number < 0 || number > 4) {
            rl.question(`Please enter a number from 0 to 4. `, function(number) {
                callback(number);
            } else {
                var book = data.items[number];
                console.log(`You've chosen ${number}.`);
                console.log(book.volumeInfo.title);
                console.log(book.volumeInfo.authors);
                console.log(book.volumeInfo.publisher);
            });
        };
    });
}



/*

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
        if (choiceInput='Y') {
            console.log(`You have chosen to see your reading list.`);
            var bookData = fs.readFilesSync('readinglist.json');
            var readingList = JSON.parse(bookData);
            console.log(readingList);
        }   else if (choiceInput='N') {
           queryPrompt();
       } else {
           console.log('Please enter Y or N');
       }
        readline.close();
    });
}
*/
main();