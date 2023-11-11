import * as db from '../../configs/database.config.js';

export async function getAllSuppliers() {
    const conn = await db.getConnection();
    try {
        const supplierList = await conn.query('SELECT * FROM SUPPLIER');
        return supplierList;
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function insertSupplier(supplierInfo) {
    const conn = await db.getConnection();
    try {
        const supplier = await conn.query('INSERT INTO SUPPLIER (supplier_name, description) VALUES (?,?)', [ supplierInfo.supplier_name, supplierInfo.description]);
        return {
            status: 200,
            message: 'Proveedor agregado con éxito'
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}
