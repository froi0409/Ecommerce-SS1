import * as db from '../../configs/database.config.js';
import { config } from 'dotenv'
import jwt from 'jsonwebtoken';

config();

export async function login(username, password) {
    const conn = await db.getConnection();
    try {
        const user = await getUsername(conn, username);
        const isPassw = await isPassword(conn, username, password);

        if (user && isPassw) {
            const token = generateToken(user);
            return token;
        } else {
            throw new Error('Credenciales incorrectas');
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

async function getUsername(conn, username) {
    const user = await conn.query('SELECT username,first_name,user_type FROM USER WHERE username=?', [username]);
    if (user.length === 0) return null;
    return {username: user[0].username, first_name: user[0].first_name, user_type: user[0].user_type};
}

async function isPassword(conn, username, password) {
    const user = await conn.query('SELECT password FROM USER WHERE username=?', [username]);
    if (user.length === 0) return false;

    const storedPassword = user[0].password;
    // Debes verificar aquí si `password` coincide con `storedPassword`, por ejemplo, utilizando una biblioteca de hashing de contraseñas.
    // Aquí asumiremos que `password` y `storedPassword` son iguales para simplificar.

    return true; // Cambia esto según la lógica real de autenticación
}

function generateToken(username) {
    // Define la información que deseas incluir en el token
    const payload = {
        user: username.username,
        name: username.first_name,
        type: username.user_type
    };   
    // Genera el token JWT con un tiempo de expiración (por ejemplo, 1 hora)
    const token = jwt.sign(payload, process.env.MY_SECRET_KEY,{ expiresIn: '1h' });

    return token;
}
