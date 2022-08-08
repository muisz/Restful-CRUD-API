const helpers = require('../helpers/product');
const responseCode = require('../constants/responseCode');

const createProductController = async (req, res) => {
    try {
        const { product_name, premium } = req.body;
        const product = await helpers.saveProduct({ product_name, premium });
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
        const products = await helpers.getProducts();
        return res.status(201).json({
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
        const product = await helpers.getProductById(id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        return res.status(201).json({
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
        const product = await helpers.getProductById(id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        await helpers.updateProductById(product.product_id, { product_name, premium });
        return res.status(201).json({
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
        const product = await helpers.getProductById(id);
        if (!product) {
            return res.status(404).json({
                ResponseCode: responseCode.GAGAL,
                ResponseDesc: 'Gagal mendapatkan data produk',
            });
        }
        await helpers.deleteProductById(product.product_id);
        return res.status(201).json({
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
