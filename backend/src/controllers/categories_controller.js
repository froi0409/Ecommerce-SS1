import * as dbCategoriesManagement from '../services/categoriesManagement/categoriesDB.js';

export const createCategory = async (req, res) => {
    const categoryInfo = {
        category_name: req.body.category_name,
        description: req.body.description
    }

    try {
        const category = await dbCategoriesManagement.createCategory(categoryInfo);
        res.json(category);    
    } catch (error) {
        console.error(error);
        return res.json({
            message: 'Ocurrio un error al crear la categoría',
            message_description: error.message
        });
    }

}

export const updateCategory = async (req, res) => {
    const categoryInfo = {
        category_name: req.body.category_name,
        filter: req.body.filter,
        new_value: req.body.new_value
    }

    try {
        const category = await dbCategoriesManagement.updateCategory(categoryInfo);
        res.json(category);
    } catch (error) {
        console.error(error);
        return res.json({
            message: 'Ocurrio un error al actualizar la categoría',
            message_description: error.message
        });
    }
}

export const getAllCategories = async (req, res) => {
    try {
        const categoriesList = await dbCategoriesManagement.getAllCategories();
        res.json(categoriesList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener las categorías",
            message_description: error.message
        })
    }
}

