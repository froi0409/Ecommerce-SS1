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

const getProductById = async (req, res) => {
    const productId = req.params.id;
    const conn = await db.getConnection();
    try {
        const product = await conn.query('SELECT p.*,s.supplier_name FROM PRODUCT AS p INNER JOIN SUPPLIER AS s ON p.supplier_id=s.supplier_id WHERE p.product_id = ?', [productId]);
        
        if (product.length === 1) {
          product[0].tags = await getTags(conn, product[0]);
          product[0].images = await getImages(conn, product[0]);
          res.json(product[0]);
        } else {
          res.status(404).json({
            message: "Producto no encontrado"
          });
        }
    } catch (error) {
        console.error(error);
        res.json({
          message: "Ocurrió un error al obtener el producto"
        });
    } finally {
        if (conn) conn.end();
    }
}

const insertProduct = async (req, res) => {
    
}

const getCategories = async (req, res) => {
    const conn = await db.getConnection();
    let categoryList = {};
    try {
        categoryList = await conn.query(' SELECT category_name FROM category');
        res.json(categoryList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener las categorias"
        })
    } finally {
        if (conn) conn.end();
    }
}

export {
    getAllProducts,
    getProductById,
    insertProduct,
    getCategories
}
