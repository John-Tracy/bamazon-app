var mysql = require('mysql');

var inquirer = require('inquirer');

var userInput;

var connection = mysql.createConnection({

	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'Bamazon'

});

var questionList = [

	{
		type: 'list',
		name: 'answer',
		message: 'What do you want to do?',
		choices: [
			'View Products for Sale',
			'View Low Inventory',
			'Add to Inventory',
			'Add New Product'
		]
	}

];

inquirer.prompt(questionList).then(function(answers){
	userInput = answers.answer;
	

	switch(userInput){

		case 'View Products for Sale': 
			console.log('case 1 worked');
			break;
		case 'View Low Inventory':
			console.log('case 2 worked');
			break;
		case 'Add to Inventory':
			console.log('case 3 worked');
			break;
		case 'Add New Product':
			console.log('case 4 worked');
			break;

	}

});