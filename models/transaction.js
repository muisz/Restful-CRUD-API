const BaseModel = require('./base');
const User = require('./user');
const Product = require('./product');

class Transaction extends BaseModel {
    constructor() {
        super('data_transaction');
        this.User = new User();
        this.Product = new Product();
    }

    calculateTotal(quantity, premium) {
        return quantity * premium;
    }

    formatTotal(total) {
        return new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(total);
    }

    all() {
        return new Promise((resolve, reject) => {
            this.knex
                .select(
                    'data_transaction.trans_id',
                    'data_transaction.trans_date',
                    'data_transaction.user_id',
                    'data_user.user_name',
                    'data_transaction.product_id',
                    'data_product.product_name',
                    'data_product.premium',
                    'data_transaction.qty_order',
                    'data_transaction.total_order',
                )
                .leftJoin('data_user', 'data_transaction.user_id', 'data_user.user_id')
                .leftJoin('data_product', 'data_transaction.product_id', 'data_product.product_id')
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
        });
    }

    getByWithJoin(column, value) {
        return new Promise((resolve, reject) => {
            this.knex
                .select(
                    'data_transaction.trans_id',
                    'data_transaction.trans_date',
                    'data_transaction.user_id',
                    'data_user.user_name',
                    'data_transaction.product_id',
                    'data_product.product_name',
                    'data_product.premium',
                    'data_transaction.qty_order',
                    'data_transaction.total_order',
                )
                .leftJoin('data_user', 'data_transaction.user_id', 'data_user.user_id')
                .leftJoin('data_product', 'data_transaction.product_id', 'data_product.product_id')
                .where(column, value)
                .first()
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
        });
    }
}

module.exports = Transaction;
