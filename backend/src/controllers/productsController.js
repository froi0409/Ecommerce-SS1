import * as db from '../configs/database.config.js';

const getAllProducts = async (req, res) => {
    
    res.json();
}

const insertProduct = async (req, res) => {
    const conn = await db.getConnection();

    try {
        const productList = await conn.query('SELECT * FROM ')
    } catch (error) {
        
    } finally {
        if (conn) conn.end();
    }
    res.json();
}

export {
    getAllProducts,
    insertProduct
}
