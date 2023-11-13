import * as db from '../../configs/database.config.js';
import { validateAccount } from '../other/paymentPortalManagement.js';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function getAllUsers() {
    const conn = await db.getConnection();
    try {
        const usersList = await conn.query('SELECT username,first_name,last_name,birth_date,user_type FROM USER');
        return usersList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function getUserByUsername(username) {
    const conn = await db.getConnection();
    try {
        const user = await conn.query('SELECT username,first_name,last_name,birth_date,user_type FROM USER WHERE username = ?', [ username ]);
        console.log(user);
        if (user.length === 0) {
            throw new Error(`No existe el usuario ${username}`);
        }
        return user;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function createUser (userInfo) {
    // encrypt password
    const hashedPassword = await hashPassword(userInfo.password);
    userInfo.password = hashedPassword;

    // valdate account is unique
    const uniqueUser = await isUnique(userInfo.username);
    if (!uniqueUser) {
        throw new Error(`El usuario ${userInfo.username} ya se encuentra registrado, prueba otro nombre de usuario`);
    }

    const conn = await db.getConnection();
    try {
        const user = await conn.query('INSERT INTO USER (username, password, first_name, last_name, birth_date, user_type) VALUES (?,?,?,?,?,?);', [
            userInfo.username,
            userInfo.password,
            userInfo.first_name,
            userInfo.last_name,
            userInfo.birth_date,
            userInfo.user_type
        ]);
        return user;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

async function isUnique (username) {
    const conn = await db.getConnection();
    try {
        const usersList = await conn.query('SELECT * FROM USER WHERE username = ? ', [ username ]);
        if (usersList.length > 0) {
            return false;
        }
        return true;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function updateUser (userInfo) {
    
    if (userInfo.filter === 'username') {
        // if update username, verify unique username
        const uniqueUser = await isUnique(userInfo.new_value);
        if (!uniqueUser) {
            throw new Error(`El usuario ${userInfo.new_value} ya se encuentra registrado, prueba otro nombre de usuario`);
        }
    }

    const conn = await db.getConnection();
    
    try {
        const update = await conn.query(`UPDATE USER SET ${userInfo.filter} = ? WHERE username = ?`, [ userInfo.new_value, userInfo.username ]);
        return update;
    } catch (error) {
        throw error;   
    } finally {
        if (conn) conn.end();
    }

}

export async function updatePassword(username, oldPassword, newPassword) {
    const conn = await db.getConnection();

    try {
        const databasePassword = await conn.query('SELECT password FROM USER WHERE username = ?', [username]);

        // Utilizamos try/catch para manejar la excepción dentro del bloque async
        try {
            const match = await comparePasswords(oldPassword, databasePassword[0].password);
            if (!match) {
                console.log(object);
                throw new Error('Las contraseñas ingresadas no coinciden');
            }

            const hashedPassword = await hashPassword(newPassword);
            const update = await conn.query('UPDATE USER SET password = ? WHERE username = ?', [hashedPassword, username]);
            return update;
        } catch (error) {
            console.error(error);
            throw error;
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function addAddress(username, address) {
    const conn = await db.getConnection();
    try {
        const result = await conn.query('INSERT INTO ADDRESS (address, user_username) VALUES (?,?)', [ address, username ]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function getAddressByUsername(username) {
    const conn = await db.getConnection();
    try {
        const addressesList = await conn.query('SELECT address FROM ADDRESS WHERE user_username = ?', [ username ]);
        return addressesList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function deleteUser () {

}

export async function addPaymentPortalAccount(accountInfo) { 
    const conn = await db.getConnection();
    try {
        const isValidAccount = await validateAccount(accountInfo.payment_portal_account, accountInfo.payment_portal_password);
        if (!isValidAccount) {
            throw new Error('Los datos de la cuenta ingresada no son válidos, verifica que los datos sean correctos');
        }

        // verify if the user is already in the account
        const hasAccount = await conn.query('SELECT * FROM PAYMENT_ACCOUNT WHERE payment_portal_account =? AND user_username =?', [ accountInfo.payment_portal_account, accountInfo.username ]);
        if (hasAccount.length > 0) {
            throw new Error(`El usuario ${accountInfo.username} ya tiene registrada la cuenta ${accountInfo.payment_portal_account}`);
        }

        const account = await conn.query('INSERT INTO PAYMENT_ACCOUNT (payment_portal_account, user_username) VALUES (?, ?)', [ accountInfo.payment_portal_account, accountInfo.username ]);
        return account;
    } catch (error) {
        throw error;
    }    
}

export async function getPaymentPortalAccountsByUsername(username) {
    const conn = await db.getConnection();
    try {
        const paymentAccountsList = await conn.query('SELECT payment_portal_account FROM PAYMENT_ACCOUNT WHERE user_username=?', [ username ]);
        return paymentAccountsList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function getPurchaesByUsername(username) {
    const conn = await db.getConnection();
    try {
        const query = `
        SELECT
            s.sale_id,
            s.sale_date,
            s.sale_hour,
            GROUP_CONCAT(p.product_name ORDER BY pd.detail_id ASC) AS product_list,
            FORMAT(SUM(pd.subtotal), 2) AS total_sale
        FROM
            SALE AS s
        JOIN
            PRODUCT_DETAIL AS pd ON s.sale_id = pd.sale_id
        JOIN
            PRODUCT AS p ON pd.product_id = p.product_id
        WHERE
            s.status = 1 AND s.user_username = ?
        GROUP BY
            s.sale_id, s.sale_date, s.sale_hour;
        `;
        const purchasesList = await conn.query(query, [ username ]);
        return purchasesList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

export async function comparePasswords(inputPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error(error);
        throw new Error('Error al comparar contraseñas');
    }
}

