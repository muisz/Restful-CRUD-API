const helpers = require('../helpers/product');
const responseCode = require('../constants/responseCode');

const createProductController = async (req, res) => {
    try {
        const { product_name, premium } = req.body;
        const product = await helpers.saveProduct({ product_name, premium });
        return res.status(201).json({
            ResponseCode: responseCode.SUCCESS,
            ResponseDesc: {
                id: product[0],
                product_name,
                premium,
            },
        });
    } catch (err) {
        return res.status(400).json({
            ResponseCode: responseCode.GAGAL,
            ResponseDesc: 'Gagal menyimpan produk',
        });
    }
};

module.exports = {
    createProductController,
};
