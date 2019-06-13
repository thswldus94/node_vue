var mysql = require('mysql');
var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'qoWlfkdlej94',
		database: 'sonjy'
});
console.log('aaa');


connection.connect();
connection.query('SELECT * from test', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].id);
	  console.log('The solution is: ', results[0].name);
	  console.log('The solution is: ', results[0].age);
});
 
connection.end();
