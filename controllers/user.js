const User = require('../models/user');
const responseCode = require('../constants/responseCode');

const createUserController = async (req, res) => {
    try {
        const { user_id, user_name, active } = req.body;
        const model = new User();
        const user = await model.save({ user_id, user_name, active });
        return res.status(201).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: {
                    user_id,
                    user_name,
                    active,
                },
            },
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal menyimpan user',
        });
    }
};

const listUserController = async (req, res) => {
    try {
        const model = new User();
        const users = await model.all();
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: users,
            },
        });
    } catch (err) {
        return res.status(404).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mendapatkan data user',
        });
    }
};

const detailUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const model = new User();
        const user = await model.getBy('user_id', id);
        if (!user) {
            throw new Error();
        }
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: user,
            },
        });
    } catch (err) {
        return res.status(404).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mendapatkan data user',
        });
    }
};

const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, user_name, active } = req.body;
        const model = new User();
        const user = await model.getBy('user_id', id);
        if (!user) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data user',
            });
        }
        await model.updateBy('user_id', user.user_id, {
            user_id,
            user_name,
            active,
        });
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: {
                    user_id,
                    user_name,
                    active,
                },
            },
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mengubah data user',
        });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const model = new User();
        const user = await model.getBy('user_id', id);
        if (!user) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data user',
            });
        }
        await model.deleteBy('user_id', user.user_id);
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: 'User berhasil dihapus',
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal menghapus data user',
        });
    }
}

module.exports = {
    createUserController,
    listUserController,
    detailUserController,
    updateUserController,
    deleteUserController,
};
