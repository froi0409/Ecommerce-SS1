import * as dbSalesManager from '../services/salesManagement/salesDB.js';

export const makeSale = async (req, res) => {
    const saleInfo = {
        username: req.body.username,
        products_detail: req.body.products_detail,
        payment_portal_account: req.body.payment_portal_account,
        payment_portal_password: req.body.payment_portal_password,
    }

    try {
        const sale = await dbSalesManager.makeSale(saleInfo);
        res.json({
            message: 'transacción realizada con éxito'
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            meesage: error.message,
            message_description: 'Error al realizar la compra'
        });
    }
}
