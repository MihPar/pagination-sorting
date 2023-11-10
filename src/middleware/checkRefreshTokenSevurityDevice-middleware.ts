import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import  jwt  from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import { HTTP_STATUS } from '../utils'
import { userService } from '../Bisnes-logic-layer/userService';
import {config} from'dotenv'
import { ObjectId } from 'mongodb';
import { jwtService } from '../Bisnes-logic-layer/jwtService';
config();

export const checkRefreshTokenSecurityDeviceMiddleware = async function(req: Request, res: Response, next: NextFunction) {
	const refreshToken = req.cookies.refreshToken
	if(!refreshToken) {
		res.sendStatus(402)
		return
	}
	let result: any

	try {
		result = await jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET!)
	} catch(err) {
		return res.sendStatus(HTTP_STATUS.NOT_WORK_SERVER_500)
	}
	
		const session = await securityDeviceRepositories.findDeviceByDeviceId(result.deviceId)
		
		if(!session || session.lastActiveDate !== await jwtService.getLastActiveDate(refreshToken)) {
			return res.sendStatus(501)
		}

		if(result.userId){
			const user = await userService.findUserById(new ObjectId(result.userId))
			if(!user) {
				return res.sendStatus(502)
			}
			req.user = user
			return next()
		}
		return res.sendStatus(503) 
	
}