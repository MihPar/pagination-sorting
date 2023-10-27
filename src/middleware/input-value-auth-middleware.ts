import { DBUserType } from '../routers/types/usersType';
import { userRepositories } from './../repositories/user-db-repositories';
import {body} from 'express-validator'

export const inputValueLoginAuth = body('login')
.isString()
.notEmpty()
.trim()
.isLength({min: 3, max: 10})
.matches(/^[a-zA-Z0-9_-]/)
.custom(async(login) => {
		const user: DBUserType | null = await userRepositories.findByLoginOrEmail(login)
		if(user) {
			throw new Error('Login does not exist in DB')
		}
		return true
})

export const inputValuePasswordAuth = body('password')
.isString()
.notEmpty()
.trim()
.isLength({min: 6, max: 20})
.withMessage('password should be length from 6 to 20 symbols')

export const inputValueEmailRegistrationAuth = body('email')
.isString()
.withMessage('1')
.trim()
.withMessage('2')
.isEmail()
.withMessage('3')
.custom(async(email) => {
	const user: DBUserType | null = await userRepositories.findByLoginOrEmail(email)
	if(user) {
		throw new Error('Email does not exist in DB')
	} 
	return true
})


export const inputValueEmaiAuth = body('email')
.isString()
.withMessage('1')
.trim()
.withMessage('2')
.isEmail()
.withMessage('3')
.custom(async(email): Promise<boolean> => {
	const user: DBUserType | null = await userRepositories.findByLoginOrEmail(email)
	if(!user) {
		throw new Error('User does not exist in DB')
	} else if(user.emailConfirmation.isConfirmed === true) {
		throw new Error('Email is already exist in DB')
	}
	return true
})

export const inputValueLoginOrEamilAuth = body('loginOrEmail')
.isString()
.notEmpty()
.trim()
.withMessage('loginOrEmail is not string')

export const inputValueCodeAuth = body('code')
.isString()
.withMessage('Code should be string')
.notEmpty()
.trim()
.custom(async(code) => {
	console.log(code)
	const user: DBUserType | null = await userRepositories.findUserByConfirmation(code)
	console.log(user)
	if(!user) {
		throw new Error('User not found')
	} 
    if(user.emailConfirmation.expirationDate <= new Date()) {
		throw new Error('code was expiration')
	} 
	if(user.emailConfirmation.isConfirmed) {
		throw new Error('Code is alreade confirmed')
	}
	return true
})