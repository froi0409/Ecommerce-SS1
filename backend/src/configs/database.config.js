import mariadb from 'mariadb';
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'Ecommerce_SS1'

});

async function connectDB() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('Connection with GENERADOR_HORARIOS db is successful');
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
} 

async function getConnection() {
    return pool.getConnection();
}

export { connectDB, getConnection }
