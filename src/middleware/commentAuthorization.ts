import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../utils";
import { jwtService } from "../Bisnes-logic-layer/jwtService";
import { userService } from "../Bisnes-logic-layer/userService";

export const commentAuthorization = async function(req: Request, res: Response, next: NextFunction) {
	if(!req.headers.authorization) {
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	}

	const token = req.headers.authorization.split(' ')[1]
	const userId = await jwtService.getUserIdByToken(token)
	if(userId) {
		const resultAuth = await userService.findUserById(userId)
		if(resultAuth){
		req.user = resultAuth
		next()
		return 
		}
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	} else {
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	}
	
}