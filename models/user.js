const BaseModel = require('./base');

class User extends BaseModel {
    constructor() {
        super('data_user');
    }
}

module.exports = User;
