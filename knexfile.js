require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME_DEV,
      user:     process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV,
      host: process.env.DB_HOST_DEV,
      port: process.env.DB_PORT_DEV,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME_STAGING,
      user:     process.env.DB_USER_STAGING,
      password: process.env.DB_PASS_STAGING,
      host: process.env.DB_HOST_STAGING,
      port: process.env.DB_PORT_STAGING,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME_PROD,
      user:     process.env.DB_USER_PROD,
      password: process.env.DB_PASS_PROD,
      host: process.env.DB_HOST_PROD,
      port: process.env.DB_PORT_PROD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'db/migrations'
    }
  }

};