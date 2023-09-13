import express from 'express'
import AuthController from '../controllers/AuthController.js'
const Route = express.Router()



//Public Routes
Route.post('/Register', AuthController.Register)
Route.post('/Login', AuthController.Login)
Route.post('/ForgetPasswordEmail', AuthController.sendUserPasswordEmail)
Route.post('/resetForgetPassword', AuthController.resetForgetPassword)

export default Route