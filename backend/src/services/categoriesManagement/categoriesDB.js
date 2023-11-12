import * as db from '../../configs/database.config.js';

export async function getAllCategories() {
    const conn = await db.getConnection();

    try {
        const categories = await conn.query('SELECT * FROM CATEGORY');
        return categories;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function createCategory(categoryInfo) {
    const conn = await db.getConnection();

    try {
        const category = await conn.query('INSERT INTO CATEGORY (category_name, description) VALUES (?,?)', [ categoryInfo.category_name, categoryInfo.description]);
        return {
            status: 200,
            message: `categoria ${categoryInfo.category_name} agregada con éxito`
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }

}

export async function updateCategory(categoryInfo) {
    const conn = await db.getConnection();

    try {
        const result = await conn.query(`UPDATE CATEGORY SET ${categoryInfo.filter}=? WHERE category_name=?`, [ categoryInfo.new_value, categoryInfo.category_name ]);
        if (result.affectedRows!== undefined && result.affectedRows === 0) {
            throw new Error(`No existe la categoria ${categoryInfo.category_name}`);
        }
        return {
            status: 200,
            message: 'Categoria actualizada con éxito'
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}


