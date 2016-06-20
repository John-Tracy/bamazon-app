var mysql = require('mysql');

var inquirer = require('inquirer');

var connection = mysql.createConnection({

	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'

});

//connection.connect(function(err){

//	if(err) throw err;


//});

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

]


inquirer.prompt(questions).then(function(answers){
	//var userInput = JSON.stringify(answers, null, '  ');
	console.log(answers.product);
})







//connection.end();