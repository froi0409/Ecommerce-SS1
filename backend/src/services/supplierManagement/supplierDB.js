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

export async function updateSupplier(supplierInfo) {
    const conn = await db.getConnection();
    try {
        const result = await conn.query(`UPDATE SUPPLIER SET ${supplierInfo.filter}=? WHERE supplier_name=?`, [ supplierInfo.new_value, supplierInfo.supplier_name ]);
        if (result.affectedRows !== undefined && result.affectedRows === 0) {
            throw new Error(`No existe el proveedor ${supplierInfo.supplier_name}`);
        }
        return {
            status: 200,
            message: 'Proveedor actualizado con éxito'
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}

export async function deleteSupplier(supplier_name) {
    const conn = await db.getConnection();
    try {
        const result = await conn.query(`DELETE FROM SUPPLIER WHERE supplier_name=?`, [supplier_name]);
        if (result.affectedRows !== undefined && result.affectedRows === 0) {
            throw new Error(`No existe el proveedor ${supplier_name}`);
        }
        return {
            status: 200,
            message: 'Proveedor eliminado con éxito'
        }
    } catch (error) {
        throw error;
    } finally {
        if (conn) conn.end();
    }
}
