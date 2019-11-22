var request = require("request");
var fs = require("fs");
require("dotenv").config();

function main() {
  getSearchTerm(function(searchTerm) {
    validateSearchTerm(searchTerm, function(searchTerm) {
      callAPI(searchTerm, function(data) {
        filterResults(data, function(data) {
          getBookNumber(data, function(number) {
            validateBookNumber(number, data, function(book) {
              saveBookToReadingList(book, function(choice) {
                getReadingListChoice(choice, function(choice) {
                  validateChoice(choice, data, function(readinglist, data) {
                    printReadingList(readinglist, data);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

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
    function(err, res, data) {
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
  });
  callback(data);
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
  var int = parseInt(number);
  if (int >= 0 && int <= 4) {
    var book = data.items[number];
    console.log(`You have chosen to save book number ${number}.`);
    console.log(book.volumeInfo.title);
    console.log(book.volumeInfo.authors);
    console.log(book.volumeInfo.publisher);
    callback(book);
  } else {
    rl.question("Please enter a number from 0 to 4. ", function(number) {
      console.log("The number fails");
      validateBookNumber(number, data, callback);
    });
  }
};
// Saves selected book to a JSON file
var saveBookToReadingList = function(book, callback) {
  fs.readFile("readinglist.json", function(err, data) {
    if (err == null) {
      var readinglist = JSON.parse(data);
      readinglist.push(book);
    } else if (err.code === "ENOENT") {
      var readinglist = [];

      readinglist.push(book);
    } else {
      throw err;
    }

    fs.writeFile(
      "readinglist.json",
      JSON.stringify(readinglist),
      "utf8",

      function(err) {
        if (err == null) {
          callback(book);
        } else if (err.code === "ENOENT") {
          console.log("File not found.");
        } else {
          throw err;
        }
      }
    );
  });
};

// //Gives user option to view "Reading List"
var getReadingListChoice = function(choice, callback, error) {
  rl.question(
    `Do you want to view your reading list? Enter Y or N. `,
    function(choice) {
      callback(choice);
    },
    function(error) {
      console.log("An error has occurred.");
    }
  );
};
//Placeholder function to check other functions work properly
var printIt = function(/*searchTerm*/) {
  console.log("App has finished");
};

var validateChoice = function(choice, callback) {
  console.log(choice);
  if (choice == "yes" || choice == "y" || choice == "Yes" || choice == "y") {
    console.log(`Here is your reading list.`);
    callback(choice);
  } else if (
    choice == "no" ||
    choice == "n" ||
    choice == "No" ||
    choice == "n"
  ) {
    console.log("Thank you for using the Google Books finder!");
  } else {
    console.log("An error has occurred.");
  }
};

var printReadingList = function(readinglist, data, callback) {
  data.items.forEach(function(book, index) {
    console.log(book.volumeInfo.title);
    console.log(book.volumeInfo.authors);
    console.log(book.volumeInfo.publisher);
    console.log(index);
  });
  callback(readinglist, data);
};

main();
