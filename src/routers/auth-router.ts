import { authValidationInfoMiddleware } from "./../middleware/authValidationInfoMiddleware";
import { checkRefreshTokenMiddleware } from "./../middleware/checkRefreshToken-middleware";
import {
  inputValueEmailAuth,
  inputValueCodeAuth,
  inputValueEmailRegistrationAuth,
  inputValuePasswordAuth,
  inputValueLoginAuth,
  inputValueLoginOrEamilAuth,
} from "./../middleware/input-value-auth-middleware";
import { BodyRegistrationEmailResendigModel } from "./../model/modelAuth/bodyRegistrationEamilResendingMidel";
import { BodyRegistrationConfirmationModel } from "./../model/modelAuth/bodyRegistrationConfirmationModel";
import { BodyRegistrationModel } from "./../model/modelAuth/bodyRegistrationMode";
import { ResAuthModel } from "./../model/modelAuth/resAuthMode";
import { jwtService } from "./../Bisnes-logic-layer/jwtService";
import { ValueMiddleware } from "./../middleware/validatorMiddleware";
import { bodyAuthModel } from "./../model/modelAuth/bodyAuthModel";
import { RequestWithBody } from "./types/types";
import { Router, Response, Request } from "express";
import { HTTP_STATUS } from "../utils";
import { userService } from "../Bisnes-logic-layer/userService";
import { ObjectId } from "mongodb";
import { DBUserType } from "./types/usersType";
export const authRouter = Router({});

authRouter.post(
  "/login",
  inputValueLoginOrEamilAuth,
  inputValuePasswordAuth,
  ValueMiddleware,
  async function (
    req: RequestWithBody<bodyAuthModel>,
    res: Response<{ accessToken: string }>
  ): Promise<Response<{ accessToken: string }>> {
    const { loginOrEmail, password } = req.body;
    const user: DBUserType | null = await userService.checkCridential(
      loginOrEmail,
      password
    );
    if (!user) {
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    } else {
      const token: string = await jwtService.createJWT(user);
      const refreshToken: string = await jwtService.createRefreshJWT(user);
      user.blackList.push(refreshToken);
      res.cookie("refresh_token", user.blackList.length - 1, {
        httpOnly: true,
        secure: true,
      });
      return res.status(HTTP_STATUS.OK_200).send({ accessToken: token });
    }
  }
);

authRouter.post(
  "/refresh-token",
  checkRefreshTokenMiddleware,
  async function (req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const currentUserId = await jwtService.getUserIdByRefreshToken(
      refreshToken
    );
    const currentUser = await userService.findUserById(currentUserId);
    if (!currentUser) {
      return null;
    }
    if (currentUser) {
      const newToken = await jwtService.createJWT(currentUser);
      const newRefreshToken = await jwtService.createRefreshJWT(currentUser);
      for (let char of currentUser.blackList) {
        if (char !== newRefreshToken) {
			currentUser.blackList.push(newRefreshToken)
          return res
            .cookie("refresh_token", currentUser.blackList, {
              httpOnly: true,
              secure: true,
            })
            .status(HTTP_STATUS.OK_200)
            .send({ accessToken: newToken });
        }
      }
    }
    return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
  }
);

authRouter.post(
  "/logout",
  checkRefreshTokenMiddleware,
  async function (req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const currentUserId = await jwtService.getUserIdByRefreshToken(
      refreshToken
    );
    const currentUser = await userService.findUserById(currentUserId);
    if (!currentUser) {
      return null;
    } else {
      currentUser.blackList.push('');
    }
    return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);

authRouter.get(
  "/me",
    authValidationInfoMiddleware,
  async function (
    req: Request,
    res: Response<ResAuthModel>
  ): Promise<Response<ResAuthModel>> {
    if (!req.headers.authorization) {
      return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    }
    const token: string = req.headers.authorization!.split(" ")[1];
    const userId: ObjectId | null = await jwtService.getUserIdByToken(token);
    if (!userId) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    const currentUser: DBUserType | null = await userService.findUserById(
      userId
    );
    if (!currentUser) return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401);
    return res.status(HTTP_STATUS.OK_200).send({
      userId: currentUser._id.toString(),
      email: currentUser.accountData.email,
      login: currentUser.accountData.userName,
    });
  }
);

authRouter.post(
  "/registration",
  inputValueLoginAuth,
  inputValuePasswordAuth,
  inputValueEmailRegistrationAuth,
  ValueMiddleware,
  async function (
    req: RequestWithBody<BodyRegistrationModel>,
    res: Response<void>
  ): Promise<Response<void>> {
    const user = await userService.createNewUser(
      req.body.login,
      req.body.password,
      req.body.email
    );
    if (!user) {
      return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

authRouter.post(
  "/registration-confirmation",
  inputValueCodeAuth,
  ValueMiddleware,
  async function (
    req: RequestWithBody<BodyRegistrationConfirmationModel>,
    res: Response<void>
  ): Promise<Response<void>> {
    await userService.findUserByConfirmationCode(req.body.code);
    return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);

authRouter.post(
  "/registration-email-resending",
  inputValueEmailAuth,
  ValueMiddleware,
  async function (
    req: RequestWithBody<BodyRegistrationEmailResendigModel>,
    res: Response<void>
  ): Promise<Response<void> | null> {
    const confirmUser = await userService.confirmEmailResendCode(
      req.body.email
    );
    if (!confirmUser) {
      return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

// 1). Регистрация в системе - отправить письмо в кодом;
// 2). Подтвердить регистрацию при помощи кода отправленного внутри ссылки на почту.
// 3). Переотправка письма с кодом регистрации, сгенерировать заново код сохранить в БД и отправить код на почту.
