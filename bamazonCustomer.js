var mysql = require('mysql');

var inquirer = require('inquirer');

var retrieveQuery = 'SELECT ItemID, ProductName, Price, StockQuantity FROM Products';

var store; // will hold DB object for global use

var userInput; // will hold the object that is returned after user input (inquirer)

var connection = mysql.createConnection({

	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'

});
// makes a connection with the mysql DB
connection.connect(function(err){
	if(err) throw err;

});
// retrieves data from DB to be displayed to customer
connection.query(retrieveQuery, function(err, data){

	store = data
	console.log(store);

});

// questions used to gather user inputs.
var questions = [
{
	type: 'input',
	name: 'product',
	message: 'Type in the ID number of the product you want to buy:',
	validate: function(value){
		if(value >= 1 && value <= 10){
			return true;
		}
		return 'Please enter a valid Product ID';
	}
},
{
	type: 'input',
	name: 'quantity',
	message: 'How many would you like?',
}

];
// calls inquirer to start question prompts
inquirer.prompt(questions).then(function(answers){
	userInput = answers; // stored in global variable for use later in program.
})







//connection.end();