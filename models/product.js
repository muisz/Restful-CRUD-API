const BaseModel = require('./base');

class Product extends BaseModel {
    constructor () {
        super('data_product');
    }
}

module.exports = Product;
