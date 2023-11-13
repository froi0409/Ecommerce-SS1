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

export async function validateMonetaryTransaction(sourceAccount, destinationAccount, amount) {
    try {
        const postData = {
            sourceAccount: sourceAccount,
            destinationAccount: destinationAccount,
            amount: amount
        }

        // Esto lo tendremos que eliminar cuando ya estén habilitados los usuarios
        return {
            status: true, // si la transacción no fue exitosa deberá retornar false
            message: 'Validación exitosa'
        };

        const response = await axios.post(`${process.env.PAYMENT_PORTAL_URL}/transaction`, postData)
        const status = response.data.status;
        const message = response.data.message;
        console.log(`Validación de Transacción: ${status}`);
        
        if (status === undefined) {
            throw new Error('Error de Servidor de Portal de Pagos');
        } else if (status === 100) {
            return {
                status: true, // si la transacción no fue exitosa deberá retornar false
                message: 'Validación exitosa'
            }
        } else {
            throw new Error(message);
        }
        
    } catch (error) {
        throw error;
    }
}
