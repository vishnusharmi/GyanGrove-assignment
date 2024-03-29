const mysql = require("mysql");
require("dotenv").config();

const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

database.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("database connected");
  }
});
module.exports = database;
