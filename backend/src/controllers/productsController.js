import { createPoolCluster } from 'mariadb';
import * as db from '../configs/database.config.js';
import { getTags, getImages } from '../services/productManagement/productProperties.js';

const getAllProducts = async (req, res) => {
    const conn = await db.getConnection();
    let productList = {};
    try {
        productList = await conn.query('SELECT p.*,s.supplier_name FROM PRODUCT AS p INNER JOIN SUPPLIER AS s ON p.supplier_id=s.supplier_id');
        for (const product of productList) {
            product.tags = await getTags(conn, product); //get product tags
            product.images = await getImages(conn, product);
        }
        res.json(productList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener los productos"
        })
    } finally {
        if (conn) conn.end();
    }
}

const insertProduct = async (req, res) => {
    
}

export {
    getAllProducts,
    insertProduct
}
