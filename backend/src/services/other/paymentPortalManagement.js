import { config } from 'dotenv'
import axios from 'axios';

config();

export async function validateAccount(account, associationToken) {
    try {
        const postData = {
            account: account,
            associationToken: associationToken
        }
        const response = await axios.post(`${process.env.PAYMENT_PORTAL_URL}/validateAccount`, postData)
        const data = response.data.status;
        console.log(`Validación de cuenta: ${data}`);
        if (data === undefined) {
            throw new Error('Error de Servidor de Portal de Pagos');
        } else if (data === 100) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw err;
    }
}

export async function validateMonetaryTransaction(sourceAccount, amount) {
    try {
        let destinationAccount = process.env.BANK_ACCOUNT;
        const splitSourceAccount = sourceAccount.split('@');
        if (splitSourceAccount.length > 1 && splitSourceAccount[1] === 'undeadbank.com')  {
            destinationAccount = process.env.BANK_ACCOUNT;
        } else {
            destinationAccount = process.env.CARD_ACCOUNT;
        }

        const postData = {
            sourceAccount: sourceAccount,
            destinationAccount: destinationAccount,
            amount: amount
        }



        // Esto lo tendremos que eliminar cuando ya estén habilitados los usuarios
        // return {
        //     status: true, // si la transacción no fue exitosa deberá retornar false
        //     message: 'Validación exitosa'
        // };

        const response = await axios.post(`${process.env.PAYMENT_PORTAL_URL}/transaction`, postData)
        const status = response.data.status;
        const message = response.data.message;
        console.log(`Validación de Transacción: ${status}`);
        
        if (status === undefined) {
            return {
                status: false, // si la transacción no fue exitosa deberá retornar false
                message: 'Error de Servidor de Portal de Pagos'
            }
        } else if (status === 100) {
            return {
                status: true, // si la transacción no fue exitosa deberá retornar false
                message: 'Validación exitosa'
            }
        } else {
            return {
                status: false, // si la transacción no fue exitosa deberá retornar false
                message: message
            }
        }
        
    } catch (error) {
        throw error;
    }
}
