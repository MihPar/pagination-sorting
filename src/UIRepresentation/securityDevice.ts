import { Device } from './types/deviceAuthSession';
import { deviceService } from "./../Bisnes-logic-layer/deviceService";
import { checkRefreshTokenMiddleware } from "../middleware/checkRefreshToken-middleware";
import { Router, Request, Response } from "express";
import { securityDeviceRepositories } from "../DataAccessLayer/securityDevice-db-repositories";
import { HTTP_STATUS } from "../utils";

export const securityDeviceRouter = Router({});

securityDeviceRouter.get(
  "/",
  checkRefreshTokenMiddleware,
  async function (
    req: Request,
    res: Response<Device | null>
  ): Promise<Response<Device | null>> {
	const userId = req.user.userId
    const getDevicesAllUsers: Device | null =
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
  checkRefreshTokenMiddleware,
  async function (
    req: Request,
    res: Response<boolean>
  ): Promise<Response<boolean>> {
	const userId = req.user.userId
	const deviceId = req.user.deviceId
    const deleteAllDevice = await deviceService.deleteAllDevice(userId, deviceId);
    if (!deleteAllDevice) {
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

securityDeviceRouter.delete(
  "/:deviceId",
  checkRefreshTokenMiddleware,
  async function (
    req: Request,
    res: Response<boolean>
  ): Promise<Response<boolean>> {
    const { deviceId } = req.params;
	const {userId} = req.user.userId
    const deleteDeviceById = await deviceService.deleteDeviceId(deviceId, userId);
    if (!deleteDeviceById) {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    } else {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
  }
);
