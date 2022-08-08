const knex = require('../knex');
const table = 'data_product';

const saveProduct = (data) => new Promise((resolve, reject) => {
    knex(table)
        .insert(data)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
});

const getProducts = () => new Promise((resolve, reject) => {
    knex(table)
        .select('*')
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
});

const getProductById = (id) => new Promise((resolve, reject) => {
    knex(table)
        .where('product_id', id)
        .first()
        .then((resp) => resolve(resp))
        .catch((err) => reject(err))
});

const updateProductById = (id, data) => new Promise((resolve, reject) => {
    knex(table)
        .where('product_id', id)
        .update(data)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
});

const deleteProductById = (id) => new Promise((resolve, reject) => {
    knex(table)
        .where('product_id', id)
        .del()
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
});

module.exports = {
    saveProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};
