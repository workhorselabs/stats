import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "wonjae",
  host: "localhost",
  database: "stats",
  password: "testing1128",
  port: 5432, // Default PostgreSQL port
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}
