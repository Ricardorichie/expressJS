const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "root1234",
}); //creates pool of connections to run muliple queries simultenously
module.exports = pool.promise();
