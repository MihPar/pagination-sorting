import { sessionService } from './../Bisnes-logic-layer/sessionService';
import  jwt  from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import { HTTP_STATUS } from '../utils'

export const checkRefreshTokenMiddleware = async function(req: Request, res: Response, next: NextFunction) {
	const refreshToken = req.body.refreshToken
	if(!refreshToken) {
		res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
		return
	}
	  const currentToken = await sessionService.findRefreshToken(refreshToken)
	if(refreshToken !== currentToken) {
		return res
		.status(HTTP_STATUS.NOT_AUTHORIZATION_401)
		.send({message: 'It isn`t valid refresh token'})
	}
	try {
		const result: any = await jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!)
		next()
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401) 
	} catch(err) {
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	}
}