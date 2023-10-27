
import * as db from '../../configs/database.config.js';
import { getTags, getImages } from './productProperties.js';

export async function getProductsDB() {
    const conn = await db.getConnection();
    try {
        const productList = await conn.query('SELECT p.*,s.supplier_name FROM PRODUCT AS p INNER JOIN SUPPLIER AS s ON p.supplier_id=s.supplier_id');
        for (const product of productList) {
            product.tags = await getTags(conn, product); //get product tags
            product.images = await getImages(conn, product);
        }
        return productList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function getProductsByCategory(category) {
    const conn = await db.getConnection();
    try {
        const productList = await conn.query('SELECT p.*,s.supplier_name FROM PRODUCT AS p INNER JOIN PRODUCT_CATEGORY AS pc ON p.product_id=pc.product_id INNER JOIN SUPPLIER AS s ON p.supplier_id=s.supplier_id WHERE pc.category_name=? GROUP BY product_id', [ category ]);
        
        if (productList.length === 0) return false; 
        
        for (const product of productList) {
            product.tags = await getTags(conn, product);
            product.images = await getImages(conn, product);
        }
        return productList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}


export async function getProductByIdDB(productId) {
    const conn = await db.getConnection();
    try {
        const product = await conn.query('SELECT p.*,s.supplier_name FROM PRODUCT AS p INNER JOIN SUPPLIER AS s ON p.supplier_id=s.supplier_id WHERE p.product_id = ?', [productId]);
        
        if (product.length === 1) {
            product[0].tags = await getTags(conn, product[0]);
            product[0].images = await getImages(conn, product[0]);
            return product[0];
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function getCategoriesDB() {
    const conn = await db.getConnection();
    try {
        const categoryList = await conn.query('SELECT category_name FROM CATEGORY');
        return categoryList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}
