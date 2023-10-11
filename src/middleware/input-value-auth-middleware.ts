import {body} from 'express-validator'

export const inputValueLoginOrEamil = body('loginOrEmail')
.isString()
.notEmpty()
.trim()
.withMessage('loginOrEmail is not string')

export const inputValuePassword = body('password')
.isString()
.notEmpty()
.trim()
.withMessage('Password is not string')