const mysql = require('mysql');

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_try',
  multipleStatements: true
});

db.connect(function(err) {
  if (err) throw err;
  else {
    console.log('Database Terkoneksi!');
  }
});

module.exports = db;
