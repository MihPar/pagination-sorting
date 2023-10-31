import { sessionService } from './../Bisnes-logic-layer/sessionService';
import  jwt  from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import { HTTP_STATUS } from '../utils'
import { userService } from '../Bisnes-logic-layer/userService';

export const checkRefreshTokenMiddleware = async function(req: Request, res: Response, next: NextFunction) {
	const refreshToken = req.cookies.refreshToken
	if(!refreshToken) {
		res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
		return
	}
	try {
		const result: any = await jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!)
		if(result.userId){
			const user = await userService.findUserById(result.userId)
			if(!user) {
				return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
			}
			const isInBlackList = await sessionService.findRefreshToken(refreshToken)
			if(refreshToken === isInBlackList) {
				return res
				.status(HTTP_STATUS.NOT_AUTHORIZATION_401)
				.send({message: 'It isn`t valid refresh token'})
			}
			req.user = user
			next()
			return
		}
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401) 
	} catch(err) {
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	}
}