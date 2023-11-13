import { config } from 'dotenv'
import axios from 'axios';

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
        return {
            status: true, // si la transacción no fue exitosa deberá retornar false
            message: 'Validación exitosa'
        };
    } catch (error) {
        throw error;
    }
}
