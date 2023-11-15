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
            message: sale
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            meesage: 'Error al realizar la compra',
            message_description: error.message
        });
    }
}
