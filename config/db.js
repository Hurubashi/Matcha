const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123123123',
  database: 'matcha',
})

module.exports = db