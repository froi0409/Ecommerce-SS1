import * as dbUserManager from '../services/userManagement/userDB.js';

export const getAllUsers = async (req, res) => {
    try {
        const usersList = await dbUserManager.getAllUsers();
        res.json(usersList);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al consultar los usuarios",
            message_description: error.message
        });
    }
}

export const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await dbUserManager.getUserByUsername(username);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al consultar el usuario",
            message_description: error.message
        });
    }
}

export const createUser = async (req, res) => {
    const userInfo = {
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        user_type: req.body.user_type,
        payment_portal_account: req.body.payment_portal_account, 
        payment_portal_password: req.body.payment_portal_password
    }

    try {
        const user = await dbUserManager.createUser(userInfo);
        res.json({
            message: `El usuario ${user.username} fue creado con éxito`
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al insertar el usuario",
            message_description: error.message
        });
    }
}

export const updateUser = (req, res) => {
    const userInfo = {
        username: req.body.username,
        filter: req.body.filter,
        new_value: req.body.new_value
    }

    try {
        const user = dbUserManager.updateUser(userInfo);
        res.json({
            message: `El usuario ${user.username} fue actualizado con éxito`
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: "Ocurrió un error al actualizar el usuario",
            message_description: error.message
        });
    }
}

export const updatePassword = async (req, res) => {
    const username = req.body.username;
    const oldPassword = req.body.old_password;
    const newPassword = req.body.new_password;
    try {
        const updatePassword = await dbUserManager.updatePassword(username, oldPassword, newPassword);
        res.json({
            message: 'La contraseña fue actualizada con éxito'
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Ocurrió un error al actualizar la contraseña',
            message_description: error.message
        });
    }
}
