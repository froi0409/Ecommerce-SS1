import axios from 'axios';

export async function validateAccount(account, associationToken) {
    try {
        // const postData = {
        //     account: account,
        //     associationToken: associationToken
        // }
        // const response = await axios.post('https://mongolia-professor-ts-completely.trycloudflare.com/validateAccount', postData);
        // const data = response.data;
        // console.log(`Validación de cuenta: ${data}`);
        return true;
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
