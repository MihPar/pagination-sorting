import { ValueMiddleware } from '../middleware/validatorMiddleware';
import { checkRefreshTokenMiddleware } from "../middleware/checkRefreshToken-middleware";
import { Router, Request, Response } from "express";
import { securityDeviceRepositories } from '../DataAccessLayer/securityDevice-db-repositories';
import { HTTP_STATUS } from '../utils';

export const securityDeviceRouter = Router({});

securityDeviceRouter.get(
  "/securityDevice",
  checkRefreshTokenMiddleware,
  ValueMiddleware,
  async function (req: Request, res: Response<boolean>): Promise<boolean> {
	const getDevicesAllUsers = await securityDeviceRepositories.getDevicesAllUsers()
	if(!getDevicesAllUsers) {
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	} else {
		return res.sendStatus(HTTP_STATUS.OK_200)
	}
  }
);
