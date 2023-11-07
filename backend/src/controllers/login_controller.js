import * as dbLoginManager from '../services/userManagement/login.js';

export const login = async (req, res) => {
    const username = req.body.username;
    const passwd = req.body.password;
    try {
        const token = await dbLoginManager.login(username, passwd);
        res.json({token: token});
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al el login"
        })
    }
}