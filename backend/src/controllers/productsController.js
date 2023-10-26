import * as dbProductManager from '../services/productManagement/productsDB.js';


const getAllProducts = async (req, res) => {
    try {
        const productList = await dbProductManager.getProductsDB();
        res.json(productList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener los productos"
        })
    }
}

const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await dbProductManager.getProductByIdDB(productId);
        if (product !== false) {
          res.json(product);
        } else {
          res.json({
            message: "Producto no encontrado"
          });
        }
    } catch (error) {
        console.error(error);
        res.json({
          message: "Ocurrió un error al obtener el producto"
        });
    }
}

const getProductsByCategory = async (req, res) => {
    const productCategory= req.params.category;
    try {
        const productList = await dbProductManager.getProductsByCategory(productCategory);
        if (productList !== false) {
            res.json(productList);
        } else {
            res.json({
                message: `La categoría ${productCategory} no tiene productos`
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener productos"
        })
    }
}

const insertProduct = async (req, res) => {
    // const conn =  await db.getConnection();
    // const product = {
    //     product_name: req.body.name,
    //     unit_price: req.body.unit_price,
    //     stock: req.body.stock,
    //     supplier_name: req.body.supplier_name,
    //     description: req.body.description,
    //     tags: req.body.tags,
    //     images: req.body.images
    // }
    // try {
    //     const supplierId = await conn.query('SELECT supplier_id FROM SUPPLIER WHERE supplier_name=?', [ product.supplier_name ]);
    //     console.log(supplierId);
    //     const insert = await conn.query('INSERT INTO PRODUCT (product_name,unit_price,stock,supplier_id,description) VALUES (?,?,?,?,?)', [ product.product_name, product.unit_price, product.stock, product.supplier_name, product.description ]);
        
    // } catch (error) {
    //     console.error(error);
    //     res.json({
    //         message: "Ocurrió un error al insertar el producto"
    //     })
    // }
}

const getCategories = async (req, res) => {
    const conn = await db.getConnection();
    let categoryList = {};
    try {
        categoryList = await conn.query('SELECT category_name FROM CATEGORY');
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
    getProductsByCategory,
    insertProduct,
    getCategories
}
