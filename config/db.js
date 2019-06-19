const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mikcer',
  database: 'matcha',
  socketPath: '/Users/hurubashi/Containers/MAMP/mysql/tmp/mysql.sock'
})

module.exports = db