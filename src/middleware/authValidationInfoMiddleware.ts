import { userService } from "./../Bisnes-logic-layer/userService";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../utils";
import { ObjectId } from "mongodb";
import { jwtService } from "../Bisnes-logic-layer/jwtService";
import { DBUserType } from "../routers/types/usersType";

export const authValidationInfoMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    return;
  }
  const token: string = req.headers.authorization!.split(" ")[1];
  const userId: ObjectId | null = await jwtService.getUserIdByToken(token);
  if (!userId) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
  const currentUser: DBUserType | null = await userService.findUserById(userId);
  next();
  return;
  //   if (!currentUser) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
};
