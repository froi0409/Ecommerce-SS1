import * as dbReportsManager from '../services/reportsManagement/reportsDB.js';

export const productsUntilADate = async (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    try {
        const productsList = await dbReportsManager.productsUntilADate(startDate, endDate);
        res.json(productsList);
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener reporte de productos entre fechas',
            message_description: error.message
        })
    }
}

export const soldProductsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const productsList = await dbReportsManager.soldProductsByCategory(category);
        res.json(productsList);
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener reporte de productos por categoria',
            message_description: error.message
        })
    }
}

export const soldProductsByName = async (req, res) => {
    const name = req.params.name;
    try {
        const productsList = await dbReportsManager.soldProductsByName(name);
        res.json(productsList);
    } catch (error) {
        res.json({
            message: 'Error al obtener reporte de productos por nombre',
            message_description: error.message
        })
    }
}

export const soldProductsBySupplier = async (req, res) => {
    const supplierName = req.params.supplierName;
    try {
        const productsList = await dbReportsManager.soldProductsBySupplier(supplierName);
        res.json(productsList);
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener reporte de productos por proveedor',
            message_description: error.message
        })
    }
}

export const salesAboveAverage = async (req, res) => {
    try {
        const productsList = await dbReportsManager.salesAboveAverage();
        res.json(productsList);
    } catch (error) {
        console.error(error);
        res.json(
            {
                message: 'Error al obtener reporte de ventas encima de la media',
                message_description: error.message
            }
        )
    }
}

export const overallSales = async (req, res) => {
    try {
        const sales = await dbReportsManager.overallSales();
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener reporte general de ventas',
            message_description: error.message
        })
    }
}

export const unsuccessfulSales = async (req, res) => {
    try {
        const unsuccessfulSales = await dbReportsManager.unsuccessfulSales();
        res.json(unsuccessfulSales);
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener reporte de ventas no procesadas',
            message_description: error.message
        })
    }
}

export const getEmployees = async (req, res) => {
    try {
        const employees = await dbReportsManager.getEmployees();
        res.json(employees);
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Error al obtener empleados',
            message_description: error.message
        })
    }
}
