import { userRepositories } from './../repositories/user-db-repositories';
import {body} from 'express-validator'

export const inputValueLoginValidation = body('login')
.isString()
.notEmpty()
.trim()
.isLength({min: 3, max: 10})
.matches(/^[a-zA-Z0-9_-]/)
.withMessage('login should be length from 3 to 10 symbols')

export const inputValuePasswordValidation = body('password')
.isString()
.notEmpty()
.trim()
.isLength({min: 6, max: 20})
.withMessage('password should be length from 6 to 20 symbols')

export const inputValueEmailValidation = body('email')
.isString()
.notEmpty()
.trim()
.isEmail()
.isLength({min: 6, max: 20})
.matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)
// .custom(async (email) => {
// 	const checkLogin = await email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/)
// 	if(!checkLogin) {
// 		throw new Error('Login is not correct')
// 	}
// 	return true
//   })
.withMessage('password should be length from 6 to 20 symbols')