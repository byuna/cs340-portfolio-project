// Get an isntance of mysql we can use in the app
var mysql = require('mysql');

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_byuna',
  password        : '6635',
  database        : 'cs340_byuna'
})

// Export it for use in our application
module.exports.pool = pool;