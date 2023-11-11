
import * as db from '../../configs/database.config.js';
import { getTags, getImages } from './productProperties.js';
import path from 'path';
import fs from 'fs';

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

export async function insertProduct(product) {
    const conn = await db.getConnection();
    try {
        
        // get supplier id
        const supplierId = await conn.query('SELECT supplier_id FROM SUPPLIER WHERE supplier_name=?', [product.supplier_name]);
        if (supplierId.length === 0) {
            throw new Error('Supplier not found');
        }
        product.supplier_id = supplierId[0].supplier_id;

        // insert product with supplier_id
        const result = await conn.query('INSERT INTO PRODUCT (product_name,unit_price,stock,supplier_id,description) VALUES (?,?,?,?,?)', [product.product_name, product.unit_price, product.stock, product.supplier_id, product.description]);
        const productId = result.insertId;

        // insert product_categories
        for (const category of product.tags) {
            await conn.query('INSERT INTO PRODUCT_CATEGORY (product_id,category_name) VALUES (?,?)', [productId, category]);
            console.log(`categoria ${category} fue agregada con éxito`);
        }
        
        // insert images
        for (let i = 0; i < product.images.length; i++) {
            const image = product.images[i];
            const extension = getFileExtension(image.originalname);
            const newFileName = `${productId}-${i}.${extension}`;

            image.originalname = newFileName;


            const publicPath = path.join('public', 'images', newFileName);
            try {
                fs.writeFileSync(publicPath, image.buffer);
                console.log(`Imagen guardada: ${newFileName}`);

                // insert image
                const insertImage = await conn.query('INSERT INTO PRODUCT_IMAGE (image_path,product_id) VALUES (?,?)', [newFileName, productId]);
                console.log(`Se insetó con éxito la imagen ${newFileName} - ${insertImage}`);
            } catch (error) {
                console.error(`Error al guardar la imagen ${newFileName}:`, error);
            }
        }
        
        return {
            status: 200,
            message: 'Producto agregado con éxito'
        };
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
