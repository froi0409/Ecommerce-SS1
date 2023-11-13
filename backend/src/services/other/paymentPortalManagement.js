import axios from 'axios';

export async function validateAccount(account, associationToken) {
    try {
        const postData = {
            account: account,
            associationToken: associationToken
        }
        const response = await axios.post('https://mongolia-professor-ts-completely.trycloudflare.com/validateAccount', postData);
        const data = response.data;
        console.log(`Validación de cuenta: ${data}`);
        return data;
    } catch (err) {
        throw err;
    }
}
