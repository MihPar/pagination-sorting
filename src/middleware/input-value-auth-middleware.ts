import { DBUserType } from './../routers/types/usersType';
import {body} from 'express-validator'
import { userRepositories } from '../repositories/user-db-repositories'

export const inputValueLoginOrEamil = body('loginOrEmail')
.isString()
.notEmpty()
.trim()
.withMessage('loginOrEmail is not string')

export const inputValueLogin = body('login')
.isString()
.isLength({min: 3, max: 10})
.matches( /^[a-zA-Z0-9_-]*$/g )
.notEmpty()
.trim()
.withMessage('loginOrEmail is not string')


export const inputValuePassword = body('password')
.isString()
.isLength({min: 6, max: 20})
.notEmpty()
.trim()
.withMessage('Password is not string')

export const inputValueEmail = body('email')
.isString()
.trim()
.matches( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g )
.withMessage('Email is not string')
.custom(async(email) => {
	const user: DBUserType | null = await userRepositories.findByLoginOrEmail(email)
	if(!user) {
		throw new Error('Email does not exist in DB')
	} 
	if(user.emailConfirmation.isConfirmed) {
		throw new Error('Email already confirmed')
	}
})

export const inputValueCode = body('code')
.isString()
.withMessage('Code is not string')