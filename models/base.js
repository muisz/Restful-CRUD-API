const knex = require('../knex');

class BaseModel {
    constructor (table) {
        this.table = table;
        this.knex = knex(table);
    }

    save(data) {
        return new Promise((resolve, reject) => {
            this.knex
                .insert(data)
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
        });
    }

    all() {
        return new Promise((resolve, reject) => {
            this.knex
                .select('*')
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
        });
    }

    getBy(column, value) {
        return new Promise((resolve, reject) => {
            this.knex
                .where(column, value)
                .first()
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
        });
    }

    updateBy(column, value, data) {
        return new Promise((resolve, reject) => {
            this.knex
                .where(column, value)
                .update(data)
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
        });
    }

    deleteBy(column, value) {
        return new Promise((resolve, reject) => {
            this.knex
                .where(column, value)
                .del()
                .then((resp) => resolve(resp))
                .catch((err) => reject(err));
        });
    }
}

module.exports = BaseModel;
