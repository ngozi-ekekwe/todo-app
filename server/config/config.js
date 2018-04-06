require('dotenv').config()

module.exports = {
  "development": {
    "url": process.env.DATABASE_STAGING_ENVIRONMENT,
    "dialect": "postgres"
  },
  "test": {
    "url": process.env.DATABASE_TEST_ENVIRONMENT,
    "dialect": "postgres"
  },
  "production": {
    "url": process.env.DATABASE_PRODUCTION_ENVIRONMENT,
    "dialect": "postgres"
  }
}
