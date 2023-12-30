const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "gameshop",
  password: "nodemysql",
});

module.exports = pool.promise();
