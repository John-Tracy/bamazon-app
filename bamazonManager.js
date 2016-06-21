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


// =================================================================

var direct = {


	viewQuery: 'SELECT ItemID, ProductName, Price, StockQuantity FROM Products',
	lowQuery: 'SELECT ItemID, ProductName, StockQuantity FROM Products WHERE StockQuantity < 5',
	initConnect: function(){
		connection.connect(function(err){
			if(err) throw err;
		});
	},
	endConnect: function(){
		connection.end();
	},
	optOne: function(){
		connection.query(direct.viewQuery, function(err, data){
			for(var i = 0; i < data.length; i++){
				console.log('--------------------');
				console.log('Product ID#: ' + data[i].ItemID);
				console.log('Name :' + data[i].ProductName);
				console.log('Price: $' + data[i].Price);
				console.log('Quantity: ' + data[i].StockQuantity);
			}
			promptList();
		});
	},
	optTwo: function(){
		connection.query(direct.lowQuery, function(err, data){
			for(var i = 0; i < data.length; i++){
				console.log('-----Low Inventory-----');
				console.log('Product ID#: ' + data[i].ItemID);
				console.log('Name :' + data[i].ProductName);
				console.log('Quantity: ' + data[i].StockQuantity);
			}
			promptList();
		});
	},

	optThreeThen: function(){

			inquirer.prompt([
					{
						type: 'input',
						name: 'idNum',
						message: 'Please put in the Product ID#',
						validate: function(value){
							if(value <= data.length){
								return true;
							}
						}
					},
					{
						type: 'input',
						name: 'amount',
						message: 'How much of this item would you like to order(quantity)?'
					}
				]).then(function(input){

					var id = input.idNum;
					var newQuantity;
					var selectQuery = 'SELECT StockQuantity FROM Products WHERE ItemID = ' + id;
					var letIt = false;
					
					connection.query(selectQuery, function(err, data){
						newQuantity = parseInt(data[0].StockQuantity) + parseInt(input.amount);
						letIt = true;
					});
					if(letIt == true){
						console.log('does this even work?')
						var updateQuery = String('UPDATE Products SET StockQuantity = ' + newQuantity + ' WHERE ItemID = ' + id);
						connection.query(updateQuery);
						promptList();
					}
			})
	}


};

// =================================================================


//var optThree = new Promise(function(resolve, reject){
//			var count = false
//		connection.query(direct.viewQuery, function(err, data){
//			for(var i = 0; i < data.length; i++){
//				console.log('--------------------');
//				console.log('Product ID#: ' + data[i].ItemID);
//				console.log('Name :' + data[i].ProductName);
//				console.log('Price: $' + data[i].Price);
//				console.log('Quantity: ' + data[i].StockQuantity);
//				if(i == data.length - 1){
//				 count = true; 
//				};
//			}
//			if(count == true){
//				resolve();
//			}
//		});

				
//	});

var questionList = [ // questions for inquirer function

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

var promptList = function(){

		inquirer.prompt(questionList).then(function(answers){
			userInput = answers.answer;
			

			switch(userInput){

				case 'View Products for Sale': 
					direct.optOne();
					break;

				case 'View Low Inventory':
					direct.optTwo();
					break;

				case 'Add to Inventory':
					optThree.then(direct.optThreeThen() ,function(){

					});
					break;

				case 'Add New Product':
					console.log('case 4 worked');
					break;

			}

		});
};
promptList();