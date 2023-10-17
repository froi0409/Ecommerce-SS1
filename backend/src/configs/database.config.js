import dotenv from 'dotenv'
import mariadb from "mariadb";

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_LOCAL_PORT
});

async function connectDB() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Connection with Ecommerce_SS1 db is successful');
    } catch (err) {
        console.error(err);
    } finally {
        if (conn) conn.end();
    }
} 

async function getConnection() {
    return pool.getConnection();
}

export {
    connectDB,
    getConnection
}
