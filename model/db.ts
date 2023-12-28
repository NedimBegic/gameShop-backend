// databaseSetup.ts

import { createPool, Pool } from "mysql";

export function setupDatabase(): Pool {
  const pool = createPool({
    host: "localhost",
    user: "root",
    password: "nodemysql",
    connectionLimit: 5,
  });

  const databaseName = "mySqlDatabase";

  function internalSetupDatabase() {
    // Query to create the database
    pool.query(
      `CREATE DATABASE IF NOT EXISTS ${databaseName}`,
      (err, results) => {
        if (err) {
          console.error("Error creating database:", err.message);
          return;
        }

        console.log(`Database '${databaseName}' created or already exists.`);
        pool.config.connectionConfig.database = databaseName;
      }
    );
  }

  // Call the internal setup function
  internalSetupDatabase();

  return pool;
}
