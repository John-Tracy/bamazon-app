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


		
	var connectPromise = new Promise(function(resolve, reject){
		// makes a connection with the mysql DB
		connection.connect(function(err){
			if(err) throw err;
	
		});
		connection.query(retrieveQuery, function(err, data){
			store = data;
			var ii = false;
			for(var i = 0; i < data.length; i++){

				console.log('--------------------');
				console.log('Product #: ' + data[i].ItemID);
				console.log('Name :' + data[i].ProductName);
				console.log('Price: $' + data[i].Price);
				console.log('Quantity: ' + data[i].StockQuantity);

				if(i == (data.length - 1)){
					ii = true;
				}

			}
				if(ii == true){
					resolve();
				}

		});

	});


var startPrompt = function() {

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
	connectPromise.then(function(){
		inquirer.prompt(questions).then(function(answers){
			userInput = answers; // stored in global variable for use later in program.
		});
	},function(){
 	// err will be thrown and execution will stop before this reject function ever executes.
})

};

startPrompt();

connection.end();






















