import { deviceService } from "./../Bisnes-logic-layer/deviceService";
import { deviceAuthSessionCollection } from "./../db/db";
import { DeviceModel } from "./types/deviceAuthSession";
import { ValueMiddleware } from "../middleware/validatorMiddleware";
import { checkRefreshTokenMiddleware } from "../middleware/checkRefreshToken-middleware";
import { Router, Request, Response } from "express";
import { securityDeviceRepositories } from "../DataAccessLayer/securityDevice-db-repositories";
import { HTTP_STATUS } from "../utils";

export const securityDeviceRouter = Router({});

securityDeviceRouter.get(
  "/",
  checkRefreshTokenMiddleware,
  ValueMiddleware,
  async function (
    req: Request,
    res: Response<DeviceModel | null>
  ): Promise<Response<DeviceModel | null>> {
    const getDevicesAllUsers: DeviceModel | null =
      await securityDeviceRepositories.getDevicesAllUsers(req.user);
    if (!getDevicesAllUsers) {
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    } else {
      return res.status(HTTP_STATUS.OK_200).send(getDevicesAllUsers);
    }
  }
);

securityDeviceRouter.delete(
  "/",
  async function (
    req: Request,
    res: Response<boolean>
  ): Promise<Response<boolean>> {
    const deleteAllDevice = await securityDeviceRepositories.deleteAllDevice();
    if (!deleteAllDevice) {
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

securityDeviceRouter.delete(
  "/:deviceId",
  async function (
    req: Request,
    res: Response<boolean>
  ): Promise<Response<boolean>> {
    const { deviceId } = req.params;
    const deleteDeviceById = await deviceService.deleteDeviceId(deviceId);
    if (!deleteDeviceById) {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    } else {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
  }
);
