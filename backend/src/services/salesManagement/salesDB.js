import * as db from '../../configs/database.config.js';
import { config } from 'dotenv';
import { validateAccount, validateMonetaryTransaction } from '../other/paymentPortalManagement.js';

config();

export async function makeSale(saleInfo) {
    const conn = await db.getConnection();
    let message = 'Error';
    try {
        
        // Get data
        const dateTime = getDate();
        let saleStatus = 1;
        

        // Create Sale
        const saleCreation = await conn.query('INSERT INTO SALE (sale_date, sale_hour, user_username, status) VALUES (?, ?, ?, ?)', [ dateTime.date, dateTime.time, saleInfo.username, 0 ]);
        const saleId = saleCreation.insertId;

        // Product Detail creation
        for (const product of saleInfo.products_detail) {
            const productStock = await conn.query('SELECT * FROM PRODUCT WHERE product_id =?', [ product.id ]);
            if (productStock.length === 0) {
                saleStatus = 0;
                message += `No existe el producto con id ${product.id}\n`;
            } else if (productStock[0].stock < product.quantity) {
                saleStatus = 0;
                message += `No hay suficientes unidades en stock para el producto ${product.id} - ${productStock[0].product_name}\n`;
            } else {
                const subtotal = Number(productStock[0].unit_price) * Number(product.quantity);
                const insertProductDetail = await conn.query('INSERT INTO PRODUCT_DETAIL (product_id, current_unit_price, quantity, subtotal, sale_id) VALUES (?,?,?,?,?)', [ product.id, productStock[0].unit_price, product.quantity, subtotal, saleId  ]);
                if (insertProductDetail.length === 0) {
                    saleStatus = 0;
                    message += `, No se ha podido crear el detalle del producto ${product.id} - ${productStock[0].product_name}`;
                }    
            }
        }


        // validate account
        const account = await conn.query('SELECT * FROM PAYMENT_ACCOUNT WHERE user_username = ? AND payment_portal_account = ?', [ saleInfo.username, saleInfo.payment_portal_account ]);
        // verify if user has the account
        if (account.length === 0) {
            saleStatus = 0;
            message += `El usuario ${saleInfo.username} no posee asociada la cuenta ${saleInfo.payment_portal_account}`;
        }

        // validate account
        const validPassword = await validateAccount(saleInfo.payment_portal_account, saleInfo.payment_portal_password);
        if (!validPassword) {
            saleStatus = 0;
            message += `, Error de autenticación en la cuenta del portal de pagos`;
        }

        // get total amount
        const amountResult = await conn.query('SELECT SUM(subtotal) AS subtotal FROM PRODUCT_DETAIL WHERE sale_id = ? GROUP BY product_id', [ saleId ]);
        let amount = 0;
        for (let i = 0; i < amountResult.length; i++) {
            const element = amountResult[i];
            console.log(`element: ${element.subtotal}`);
            amount += Number(element.subtotal);
        }

        console.log(amount);
        if (amount.length === 0) {
            saleStatus = 0;
            message += `, No se ha podido obtener el total de la venta`;
        }

        if (saleStatus === 1) {
            // Init Transaction
            try {
                await conn.beginTransaction();

                
                // Update product stock
                for (const product of saleInfo.products_detail) {
                    const productUpdate = await conn.query('UPDATE PRODUCT SET stock = stock - ? WHERE product_id = ?', [ product.quantity, product.id ]);
                }

                // Update product status
                await conn.query('UPDATE SALE SET status = ? WHERE sale_id = ?', [ saleStatus, saleId ]);

                // Validate payment
                const validateTransaction = await validateMonetaryTransaction(saleInfo.payment_portal_account, amount);
                if (!validateTransaction.status) {
                    message += `, ${validateTransaction.message}`;                
                    await conn.rollback();
                    await conn.query('UPDATE SALE SET message = ? WHERE sale_id = ?', [ message, saleId ]);
                    throw new Error(message);
                }

                await conn.commit();
            } catch (error) {
                if (conn) {
                    await conn.rollback();
                }
                await conn.query('UPDATE SALE SET message = ? WHERE sale_id = ?', [ message, saleId ]);
                throw new Error(message);
            }
        } else {
            console.log(`Mensaje: ${message}`);
            await conn.query('UPDATE SALE SET message = ? WHERE sale_id = ?', [ message, saleId ]);
            throw new Error(message);
        }

        return ('La transacción fue realizada con éxito');

    } catch (error) {
        throw new Error(message);
    } finally {
        if (conn) conn.end();
    }
}

function getDate() {
    const actualDate = new Date()

    const year = actualDate.getFullYear();
    const month = actualDate.getMonth() + 1;
    const day = actualDate.getDate();

    const hour =  actualDate.getHours();
    const minute = actualDate.getMinutes();
    const second = actualDate.getSeconds();

    return {
        date: `${year}/${month}/${day}`,
        time: `${hour}:${minute}:${second}`
    }
}
