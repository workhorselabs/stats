import { Pool } from "pg";

const pool = new Pool({
  user: "remix_user",
  host: "localhost",
  database: "remix_db",
  password: "your_secure_password",
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
