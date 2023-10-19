import { ResAuthModel } from './../model/modelAuth/resAuthMode';
import { jwtService } from "./../Bisnes-logic-layer/jwtService";
import {
  inputValueLoginOrEamil,
  inputValuePassword,
} from "./../middleware/input-value-auth-middleware";
import { ValueMiddleware } from "./../middleware/validatorMiddleware";
import { bodyAuthModel } from "./../model/modelAuth/bodyAuthModel";
import { RequestWithBody } from "./types/types";
import { Router, Response, Request } from "express";
import { HTTP_STATUS } from "../utils";
import { userService } from "../Bisnes-logic-layer/userService";
import { ObjectId } from "mongodb";
import { DBUserType, UserType } from './types/usersType';

export const authRouter = Router({});

authRouter.post(
  "/login",
  inputValueLoginOrEamil,
  inputValuePassword,
  ValueMiddleware,
  async function (
    req: RequestWithBody<bodyAuthModel>,
    res: Response<{accessToken: string}>
  ): Promise<Response<{accessToken: string}>> {
    const { loginOrEmail, password } = req.body;
    const user: DBUserType | null = await userService.checkCridential(
      loginOrEmail,
      password
    );
    if (!user) {
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    } else {
      const token: string = await jwtService.createJWT(user);
      return res.status(HTTP_STATUS.OK_200).send({accessToken: token});
    }
  }
);


authRouter.get("/me", async function (req: Request, res: Response<ResAuthModel>): Promise<Response<ResAuthModel>> {
  if (!req.headers.authorization) {
    return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
  }

  const token: string = req.headers.authorization!.split(" ")[1];

  const userId: ObjectId | null = await jwtService.getUserIdByToken(token);
  if(!userId) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);

	const currentUser: DBUserType | null = await userService.findUserById(userId)
	if(!currentUser) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);

	return res
    .status(HTTP_STATUS.OK_200)
    .send({
		userId: currentUser._id.toString(),
		email: currentUser.email,
		login: currentUser.login
	});
  }
);
