const responseCode = require('../constants/responseCode');
const Product = require('../models/product');

const createProductController = async (req, res) => {
    try {
        const { product_name, premium } = req.body;
        const model = new Product();
        const product = await model.save({ product_name, premium });
        return res.status(201).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: {
                    product_id: product[0],
                    product_name,
                    premium,
                },
            },
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal menyimpan produk',
        });
    }
};

const listProductController = async (req, res) => {
    try {
        const model = new Product();
        const products = await model.all();
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: products,
            },
        });
    } catch (err) {
        return res.status(404).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mendapatkan data produk',
        });
    }
};

const detailProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const model = new Product();
        const product = await model.getBy('product_id', id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: product,
            },
        });
    } catch (err) {
        return res.status(404).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mendapatkan data produk',
        });
    }
};

const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, premium } = req.body;
        const model = new Product();
        const product = await model.getBy('product_id', id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        await model.updateBy('product_id', product.product_id, { product_name, premium });
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                data: {
                    product_id: product.product_id,
                    product_name,
                    premium,
                },
            },
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal mengubah data produk',
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const model = new Product();
        const product = await model.getBy('product_id', id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        await model.deleteBy('product_id', product.product_id);
        return res.status(200).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: 'Produk berhasil dihapus',
        });
    } catch (err) {
        return res.status(404).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal menghapus data produk',
        });
    }
};

module.exports = {
    createProductController,
    listProductController,
    detailProductController,
    updateProductController,
    deleteProductController,
};
