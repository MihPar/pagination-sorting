import { DBUserType } from '../routers/types/usersType';
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

export const inputValueEmailValidatioin = body('email')
.isString()
.trim()
.matches( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g )
.custom(async(email) => {
	const user: DBUserType | null = await userRepositories.findByLoginOrEmail(email)
	if(!user) {
		throw new Error('Email does not exist in DB')
	} 
	if(user.emailConfirmation.isConfirmed) {
		throw new Error('Email already confirmed')
	}
})
.withMessage('Email is not string')