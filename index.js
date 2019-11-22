//Issue 21/11: When I type a number in ressponse to query about what book to save, it keeps printing error message.

var request = require("request");
var fs = require("fs");
require("dotenv").config();

//1.) Ask what book user wants to look up
//getUserInput(validateInput);
//3.) Prints out 5 choices of books with author, title and publishing company
// bookChoices();
//4.) Program asks user which one to put on the bookshelf
//savedBook();
//5.) Program stores those books by pushing the new book onto the end of the array
//viewReadingList();

function main() {
  getSearchTerm(function(searchTerm) {
    validateSearchTerm(searchTerm, function(searchTerm) {
      callAPI(searchTerm, function(data) {
        filterResults(data, function(data) {
          getBookNumber(data, function(number) {
            validateBookNumber(number, data, function(number)/* {
              saveBookToReadingList(number, function(readingList)*/ {
                printIt(number);
              });
            });
          });
        });
      });
    });
  }
  //);
//}

//Requires the readline module for taking user input
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Asks what kind of book the user wants to look up
var getSearchTerm = function(callback, error) {
  rl.question(
    "What kinds of books are you looking for? ",
    function(searchTerm) {
      callback(searchTerm);
    },
    function(error) {
      console.log("There is an error");
      rl.close();
    }
  );
};

//Validates user input
var validateSearchTerm = function(searchTerm, callback) {
  if (searchTerm !== "" && searchTerm !== null) {
    console.log(`Here is a list of five ${searchTerm} books.`);
    callback(searchTerm);
  } else {
    rl.question(
      "Please enter one or more keywords for the books you're looking for. ",
      function(searchTerm) {
        validateSearchTerm(searchTerm, callback);
      }
    );
  }
};

//Calls Google books API with the search string and API key
var callAPI = function(searchTerm, callback) {
  var key = process.env.GOOGLE_BOOKS_API;
  request(
    "https://www.googleapis.com/books/v1/volumes?q=" +
      searchTerm +
      "&maxResults=5" +
      "&key=" +
      key,
    { json: true },
    (err, res, data) => {
      if (err) {
        console.log("The API call failed. Please try again.");
        throw err;
      } else {
        callback(data);
      }
    }
  );
};

var filterResults = function(data, callback) {
  data.items.forEach(function(book, index) {
    console.log(book.volumeInfo.title);
    console.log(book.volumeInfo.authors);
    console.log(book.volumeInfo.publisher);
    console.log(index);
    callback(data);
  });
};

//Asks user what book to save to the reading list
var getBookNumber = function(number, callback, error) {
  rl.question(
    `Which book do you want to save to your reading list? Type the number that corresponds to it. `,
    function(number) {
      callback(number);
    },
    function(error) {
      console.log("An error has occurred.");
      rl.close();
    }
  );
};

//Validates book number input
var validateBookNumber = function(number, data, callback) {
   
  if (number !== "" && (number >= 0 || number <= 4) && typeof number == "number" /* && 
   /*number == "" || typeof !=== "number" || Number.isInteger(number) || number < 0 || number > 4*/) {
    console.log('The number passes')
    var book = data.items[number];
    console.log(`You have chosen to save book number ${number}.`);
    console.log(book.volumeInfo.title);
    console.log(book.volumeInfo.authors);
    console.log(book.volumeInfo.publisher);
    callback(number);
    
     // })} else if ()) {
   //Whatever number you type in doesn't meet the criteria        
  } else {
    rl.question("Please enter a number from 0 to 4. ", 
        function(number) {
            console.log('The number fails')
      validateBookNumber(number, callback);
  })};
}
// //Saves selected book to a JSON file
// var saveBookToReadingList = function(book) {
//   var readingList = [];
//   readingList.push(book);
//   fs.writeFile(
//     "readinglist.json",
//     JSON.stringify(readingList),
//     "utf8",
//     function() {},
//     callback(readingList);
//   );
//   //What can the app print out to the screen if the filesystem errors?
  
// }

//Placeholder function to check other functions work properly
var printIt = function(/*searchTerm*/) {
  console.log("App has finished");
};

//add new book to it
//save new list

// //Gives user option to view "Reading List"
// function viewReadingList() {
//     rl.question(`Do you want to view your reading list? Enter Y or N `, function(choiceInput) {
//         if (choiceInput == 'Y' || choiceInput == 'y' || choiceInput == 'yes' || choiceInput == 'Yes') {
//             console.log(`You have chosen to see your reading list.`);
//             var bookData = fs.readFilesSync('readinglist.json');
//             var readingList = JSON.parse(bookData);
//             console.log(readingList);
//         }   else if (choiceInput='N' || choiceInput == 'n' || choiceInput == 'no' || choiceInput == 'No' ) {
//             rl.question(`Do you want to keep looking for books? Enter Y or No. `, function(choiceInput) {
//                 if (choiceInput == 'Y' || choiceInput == 'y' || choiceInput == 'yes' || choiceInput == 'Yes') {
//                     getSearchTerm();
//                 }   else if (choiceInput='N' || choiceInput == 'n' || choiceInput == 'no' || choiceInput == 'No' ) {
//                     console.log('Thank you for using the Google Books finder!')
//                 }
//        } else {
//            console.log('Please enter Y or N');
//        }
//         readline.close();
//     });
// }

main();
