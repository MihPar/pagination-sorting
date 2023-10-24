import {body} from 'express-validator'

export const inputValueLoginOrEamil = body('loginOrEmail')
.isString()
.notEmpty()
.trim()
.withMessage('loginOrEmail is not string')

export const inputValueLogin = body('login')
.isString()
.isLength({min: 3, max: 10})
.matches( /^[a-zA-Z0-9_-]*$/ )
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
.matches( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ )
.withMessage('Email is not string')

export const inputValueCode = body('code')
.isString()
.withMessage('Code is not string')