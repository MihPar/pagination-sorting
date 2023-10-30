import  jwt  from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import { HTTP_STATUS } from '../utils'
import { jwtService } from '../Bisnes-logic-layer/jwtService'
import { list } from '../whiteList';

export const checkRefreshTokenMiddleware = async function(req: Request, res: Response, next: NextFunction) {
	const refreshToken = req.body.refreshToken
	if(!refreshToken) {
		res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
		return
	}
	if(refreshToken !== list.refreshToken) {
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