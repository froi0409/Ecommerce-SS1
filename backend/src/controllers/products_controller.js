import * as dbProductManager from '../services/productManagement/productsDB.js';


const getAllProducts = async (req, res) => {
    try {
        const productList = await dbProductManager.getProductsDB();
        res.json(productList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener los productos",
            message_description: error.message
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
          message: "Ocurrió un error al obtener el producto",
          message_description: error.message
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
            message: "Ocurrió un error al obtener productos",
            message_description: error.message
        })
    }
}

const getCategories = async (req, res) => {
    try {
        const categoryList = await dbProductManager.getCategoriesDB();
        res.json(categoryList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener las categorias",
            message_description: error.message,
        });
    }
}

const insertProduct = async (req, res) => {
    try {
        const product = {
            product_name: req.body.product_name,
            unit_price: req.body.unit_price,
            stock: req.body.stock,
            supplier_name: req.body.supplier_name,
            description: req.body.description,
            tags: req.body.tags,
            images: req.files
        }
        if (product.description === undefined) {
            product.description = 'Sin Descripción';
        }

        console.log(product);

        const productInsert = await dbProductManager.insertProduct(product);
        res.json(productInsert);    
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al insertar el producto",
            message_description: error.message
        });
    }
}

const removeProduct = async (req, res) => {

}

export {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    insertProduct,
    getCategories,
    removeProduct
}
