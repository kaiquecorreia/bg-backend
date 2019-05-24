require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const express = require('express')
const mongoose = require('mongoose')
const dataBaseConfig = require('./config/database')
const cors = require('cors')
class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    this.enableCors()
    this.database()
    this.middlewares()
    this.routes()
  }
  enableCors () {
    const corsOptions = {
      origin: true,
      credentials: true
    }
    this.express.use(cors(corsOptions))
  }
  database () {
    mongoose.connect(dataBaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }
  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }
}

module.exports = new App().express
