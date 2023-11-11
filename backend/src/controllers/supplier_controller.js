import * as dbSupplierManager from '../services/supplierManagement/supplierDB.js'

export const getAllSuppliers = async (req, res) => {
    try {
        const supplierList = await dbSupplierManager.getAllSuppliers();
        res.json(supplierList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al obtener los proveedores",
            message_description: error.message
        })
    }
}

export const insertSupplier = async (req, res) => {
    const supplierInfo = {
        supplier_name: req.body.supplier_name,
        description: req.body.description
    }

    try {
        const supplier = await dbSupplierManager.insertSupplier(supplierInfo);
        res.json(supplier);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al insertar el proveedor",
            message_description: error.message
        })
    }
}


export const updateSupplier = async (req, res) => {
    const info = {
        supplier_name: req.body.supplier_name,
        filter: req.body.filter,
        new_value: req.body.new_value
    }
    try {   
        const supplier = await dbSupplierManager.updateSupplier(info);
        res.json(supplier);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al actualizar el proveedor",
            message_description: error.message
        })
    }
}


export const deleteSupplier = async (req, res) => {
    try {
        const deleteSupplier = await dbSupplierManager.deleteSupplier(req.body.supplier_name);
        res.json(deleteSupplier);       
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al eliminar el proveedor",
            message_description: error.message
        })
    }
}