const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Connection = require('./database/connection')
const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = 3333
app.listen(process.env.PORT || PORT, () => {
  console.log(`app listen..on port ${PORT}`)
})
