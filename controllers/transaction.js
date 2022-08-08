const Transaction = require('../models/transaction');
const responseCode = require('../constants/responseCode');

const createTransactionController = async (req, res) => {
    try {
        const { user_id, product_id, qty_order } = req.body;
        const model = new Transaction();
        const user = await model.User.getBy('user_id', user_id);
        if (!user) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data user',
            });
        }
        const product = await model.Product.getBy('product_id', product_id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        const total_order = model.calculateTotal(qty_order, product.premium);
        const trans_date = new Date();
        const transaction = await model.save({
            user_id: user.user_id,
            product_id: product.product_id,
            qty_order,
            total_order,
            trans_date,
        });
        const total_order_format = model.formatTotal(total_order);
        return res.status(201).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: `Total order Rp.${total_order_format}`,
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal menyimpan transaksi',
        });
    }
};

const listTransactionController = async (req, res) => {
    try {
        const model = new Transaction();
        const transactions = await model.all();
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: transactions,
            },
        });
    } catch (err) {
        return res.status(404).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mendapatkan data transaksi',
        });
    }
};

const detailTransactionController = async (req, res) => {
    try {
        const { id } = req.params;
        const model = new Transaction();
        const transaction = await model.getByWithJoin('trans_id', id);
        if (!transaction) {
            throw new Error();
        }
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: transaction,
            },
        });
    } catch (err) {
        return res.status(404).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mendapatkan data transaksi',
        });
    }
};

const updateTransactionController = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, product_id, qty_order } = req.body;
        const model = new Transaction();
        const transaction = await model.getBy('trans_id', id);
        if (!transaction) {
            throw new Error();
        }
        const user = await model.User.getBy('user_id', user_id);
        if (!user) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data user',
            });
        }
        const product = await model.Product.getBy('product_id', product_id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        const total_order = model.calculateTotal(qty_order, product.premium);
        const trans_date = new Date();
        await model.updateBy('trans_id', transaction.trans_id, {
            user_id: user.user_id,
            product_id: product.product_id,
            qty_order,
            total_order,
            trans_date,
        });
        const total_order_format = model.formatTotal(total_order);
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: `Total order Rp.${total_order_format}`,
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mengubah data transaksi',
        });
    }
};

const deleteTransactionController = async (req, res) => {
    try {
        const { id } = req.params;
        const model = new Transaction();
        const transaction = await model.getBy('trans_id', id);
        if (!transaction) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data transaksi',
            });
        }
        await model.deleteBy('trans_id', transaction.trans_id);
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: 'Transaksi berhasil dihapus',
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal menghapus data transaksi',
        });
    }
}

module.exports = {
    createTransactionController,
    listTransactionController,
    detailTransactionController,
    updateTransactionController,
    deleteTransactionController,
};
