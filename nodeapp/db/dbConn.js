var mysql = require('mysql');

module.exports = function() {
	return {
		init: function() {
			return mysql.createConnection({
				host: 'localhost',
				port: 3306,
				user: 'root',
				password: 'qoWlfkdlej94',
				database: 'sonjy'
			})
		},

		test_open: function(conn) {
			conn.connect(function(err) {
				if (err) {
					console.log('mysql connection error: ' + err);
				} else {
					console.log('mysql is connected successfilly');
				}
			})
		}
	}
};
