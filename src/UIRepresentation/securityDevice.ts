import { jwtService } from './../Bisnes-logic-layer/jwtService';
import { checkForbiddenSevurityDevice } from './../middleware/checkForbiddenSecurityDevice';
import { checkRefreshTokenSecurityDeviceMiddleware } from './../middleware/checkRefreshTokenSevurityDevice-middleware';
import { DeviceViewModel } from './types/deviceAuthSession';
import { deviceService } from "./../Bisnes-logic-layer/deviceService";
import { Router, Request, Response } from "express";
import { securityDeviceRepositories } from "../DataAccessLayer/securityDevice-db-repositories";
import { HTTP_STATUS } from "../utils";
import { ObjectId } from 'mongodb';

export const securityDeviceRouter = Router({});

securityDeviceRouter.get(
  "/",
  checkRefreshTokenSecurityDeviceMiddleware,
  async function (
    req: Request,
    res: Response<DeviceViewModel[]>
  ): Promise<Response<DeviceViewModel[]>> {
	const userId = req.user._id.toString()	
    const getDevicesAllUsers: DeviceViewModel[] =
      await securityDeviceRepositories.getDevicesAllUsers(userId);
    if (!getDevicesAllUsers) {
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    } else {
      return res.status(HTTP_STATUS.OK_200).send(getDevicesAllUsers);
    }
  }
);

securityDeviceRouter.delete(
  "/",
  checkRefreshTokenSecurityDeviceMiddleware,
  async function (
    req: Request,
    res: Response<boolean>
  ): Promise<Response<boolean>> {

	const userId = req.user._id.toString()

	const refreshToken = req.cookies.refreshToken
	const payload = await jwtService.decodeRefreshToken(refreshToken)

	const findAllCurrentDevices = await deviceService.terminateAllCurrentSessions(userId, payload.deviceId)
	if (!findAllCurrentDevices) {
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
	  } 
	return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);

securityDeviceRouter.delete(
  "/:deviceId",
  checkRefreshTokenSecurityDeviceMiddleware,
  checkForbiddenSevurityDevice,
  async function (
    req: Request,
    res: Response<boolean>
  ): Promise<Response<boolean>> {
	const deviceId = req.params.deviceId
	console.log('deviceId:', deviceId)
	if(!deviceId) {
		return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	}
	// const refreshToken = req.cookies.refreshToken
    // const payload = await jwtService.decodeRefreshToken(refreshToken)
    const deleteDeviceById = await securityDeviceRepositories.terminateSession(new ObjectId(deviceId));
    if (!deleteDeviceById) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);
