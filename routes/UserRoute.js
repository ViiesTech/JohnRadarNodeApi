import express from 'express'
import AuthController from '../controllers/AuthController.js'
import checkUserAuth from '../middleware/Auth_Middleware.js'
import MainController from '../controllers/MainController.js'

const Route = express.Router()

Route.use('/getUserData' , checkUserAuth)


//Public Routes
Route.post('/Register', AuthController.Register)
Route.post('/Login', AuthController.Login)
Route.post('/ForgetPasswordEmail', AuthController.sendUserPasswordEmail)
Route.post('/VerifyOtp', AuthController.VerifyOtp)
Route.post('/resetForgetPassword', AuthController.resetForgetPassword)


//Private/Protected Routes

Route.get('/getUserData', MainController.GetMyData)
Route.post('/RegisterYourLocation', MainController.RegisterYourLocation)


export default Route