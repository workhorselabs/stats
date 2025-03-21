const { Pool } = require("pg");

const pool = new Pool({
  user: "wonjae", // your actual db user
  host: "localhost",
  database: "stats", // your actual db name
  password: "testing1128", // your actual db password
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
