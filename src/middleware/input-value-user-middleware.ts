import { tr } from 'date-fns/locale';
import { DBUserType } from '../routers/types/usersType';
import { userRepositories } from './../repositories/user-db-repositories';
import {body} from 'express-validator'
import { log } from 'console';

export const inputValueLoginValidation = body('login')
.isString()
.withMessage('1')
.notEmpty()
.withMessage('2')
.trim().withMessage('3')
.isLength({min: 3, max: 10})
.withMessage('4')
.matches(/^[a-zA-Z0-9_-]/)
.withMessage('5')
.custom(async(login) => {
		const user: DBUserType | null = await userRepositories.findByLoginOrEmail(login)
		if(user) {
			throw new Error('Login does not exist in DB')
		}
		return true
	})
.withMessage('6')

export const inputValuePasswordValidation = body('password')
.isString()
.notEmpty()
.trim()
.isLength({min: 6, max: 20})
.withMessage('password should be length from 6 to 20 symbols')

export const inputValueEmailRegistrationValidatioin = body('email')
.isString()
.withMessage('1')
.trim()
.withMessage('2')
// .matches( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g )
.isEmail()
.withMessage('3')
.custom(async(email) => {
	const user: DBUserType | null = await userRepositories.findByLoginOrEmail(email)
	// log('u e', user)
	if(user) {
		throw new Error('Email does not exist in DB')
	} 
	return true
})
.withMessage('4')

export const inputValueEmailValidatioin = body('email')
.isString()
.withMessage('1')
.trim()
.withMessage('2')
// .matches( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g )
.isEmail()
.withMessage('3')
.custom(async(email): Promise<boolean> => {
	const user: DBUserType | null = await userRepositories.findByLoginOrEmail(email)
	// if(user) {
	// 	throw new Error('Email is already confirmed')
	// }
	if(!user) {
		throw new Error('User does not exist in DB')
	} else if(user.emailConfirmation.isConfirmed === true) {
		throw new Error('Email is already exist in DB')
	}
	return true
})
.withMessage('4')

export const inputValueLoginOrEamil = body('loginOrEmail')
.isString()
.notEmpty()
.trim()
.withMessage('loginOrEmail is not string')

export const inputValueCodeValidation = body('code')
.isString()
.withMessage('Code should be string')
.notEmpty()
.trim()
.custom(async(code) => {
	const user: DBUserType | null = await userRepositories.findUserByConfirmation(code)
	if(!user) {
		throw new Error('User not found')
	} 
	if(user.emailConfirmation.isConfirmed || user.emailConfirmation.expirationDate || user.emailConfirmation.confirmationCode) {
		throw new Error('Code is alreade confirmed')
	}
	return true
})
.withMessage('Code is alreade confirmed')