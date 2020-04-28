const express = require('express')

require('dotenv').config()

const signUpController = require('./controllers/signUpController')
const SignInController = require('./controllers/signInController')

const searchUserController = require('./controllers/searchUserController')

const routes = express.Router()

routes.post('/signup',signUpController.create)

routes.post('/signin',SignInController.create)

routes.get('/users',searchUserController.authenticateToken)
module.exports = routes
