import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import { ObjectId } from 'mongodb';
import { deviceService } from './../Bisnes-logic-layer/deviceService';
import { HTTP_STATUS } from '../utils';
import { jwtService } from './../Bisnes-logic-layer/jwtService';
import { NextFunction, Request, Response } from 'express';

export const checkForbiddenSevurityDevice = async function(req: Request, res: Response, next: NextFunction) {
	const {deviceId} = req.params
	const {userId} = req.user.userId
	const findSession = await securityDeviceRepositories.findDeviceByDeviceId(new ObjectId(deviceId))
	if(!findSession) {
		return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	}
	if(findSession.userId !== userId) {
		return res.sendStatus(HTTP_STATUS.FORBIDEN_403)
	}
	next()
	return 
}