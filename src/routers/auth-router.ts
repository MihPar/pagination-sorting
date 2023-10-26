import { inputValueCode, inputValueLoginOrEamil } from './../middleware/input-value-user-middleware';
import { BodyRegistrationEmailResendigModel } from './../model/modelAuth/bodyRegistrationEamilResendingMidel';
import { BodyRegistrationConfirmationModel } from './../model/modelAuth/bodyRegistrationConfirmationModel';
import { BodyRegistrationModel } from './../model/modelAuth/bodyRegistrationMode';
import { ResAuthModel } from "./../model/modelAuth/resAuthMode";
import { jwtService } from "./../Bisnes-logic-layer/jwtService";
import { ValueMiddleware } from "./../middleware/validatorMiddleware";
import { bodyAuthModel } from "./../model/modelAuth/bodyAuthModel";
import { RequestWithBody } from "./types/types";
import { Router, Response, Request } from "express";
import { HTTP_STATUS } from "../utils";
import { userService } from "../Bisnes-logic-layer/userService";
import { ObjectId } from "mongodb";
import { DBUserType, UserType } from "./types/usersType";
import { inputValueEmailRegistrationValidatioin, inputValueEmailValidatioin, inputValueLoginValidation, inputValuePasswordValidation } from '../middleware/input-value-user-middleware';
import { log } from 'console';

export const authRouter = Router({});

authRouter.post(
  "/login",
  inputValueLoginOrEamil,
  inputValuePasswordValidation,
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
      return res.status(HTTP_STATUS.OK_200).send({ accessToken: token });
    }
  }
);

authRouter.get(
  "/me",
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
  inputValueLoginValidation,
  inputValuePasswordValidation,
  inputValueEmailRegistrationValidatioin,
  ValueMiddleware,
  async function (req: RequestWithBody<BodyRegistrationModel>, res: Response<void>): Promise<Response<void>> {
    const user = await userService.createNewUser(
      req.body.login,
      req.body.password,
      req.body.email,
    );
	if(!user) {
		return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
	} else {
		return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
	}
  }
);

authRouter.post(
  "/registratioin-confirmation",
  inputValueCode,
  ValueMiddleware,
  async function (req: RequestWithBody<BodyRegistrationConfirmationModel>, res: Response<void>): Promise<Response<void>> {
    // const result = await userService.confirmEmail(
    //   req.body.code,
    //   req.body.email
    // );
    const result = await userService.findUserByConfirmationCode(req.body.code);
	if(!result) {
		return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
	} else {
		return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
	}
  }
);

authRouter.post(
  "/registration-email-resending",
  inputValueEmailValidatioin,
  ValueMiddleware,
  async function (req: RequestWithBody<BodyRegistrationEmailResendigModel>, res: Response<void>): Promise<Response<void> | null> {
	const confirmUser = await userService.confirmEmailResendCode(req.body.email)
	if(!confirmUser) {
		return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400)
	} else {
		return res.sendStatus(HTTP_STATUS.NO_CONTENT_204)
	}
  }
);

// 1). Регистрация в системе - отправить письмо в кодом;
// 2). Подтвердить регистрацию при помощи кода отправленного внутри ссылки на почту.
// 3). Переотправка письма с кодом регистрации, сгенерировать заново код сохранить в БД и отправить код на почту.