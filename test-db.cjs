const { Pool } = require("pg");

const pool = new Pool({
  user: "remix_user", // your actual db user
  host: "localhost",
  database: "remix_db", // your actual db name
  password: "your_secure_password", // your actual db password
  port: 5432,
});

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("✅ DB connected:", res.rows[0]);
    pool.end();
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    pool.end();
  });
