const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require ('./middleware/auth')

const bankController = require ('./controllers/bankController')
const bankCreateValidator = require('./validators/bankCreate')
const bankUpdateValidator = require('./validators/bankUpdate')

// All the routes after need authentication

routes.use(authMiddleware)

routes.post('/bank', validate(bankCreateValidator), handle(bankController.createBankUser))
routes.put('/bank', validate(bankUpdateValidator), handle(bankController.updateBankUser))

module.exports = routes