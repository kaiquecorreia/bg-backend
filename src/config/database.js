require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

module.exports = {
  uri: process.env.DB_URI_TEST || process.env.DB_URI
}
