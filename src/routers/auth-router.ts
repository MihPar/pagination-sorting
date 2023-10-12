import { inputValueLoginOrEamil, inputValuePassword } from './../middleware/input-value-auth-middleware';
import { ValueMiddleware } from "./../middleware/validatorMiddleware";
import { bodyAuthModel } from "./../model/modelAuth/bodyAuthModel";
import { RequestWithBody } from "./../types";
import { Router, Response } from "express";
import { HTTP_STATUS } from "../utils";
import { userService } from "../domain/userService";

export const authRouter = Router({});

authRouter.post(
  "/",
  inputValueLoginOrEamil,
  inputValuePassword,
  ValueMiddleware,
  async function (req: RequestWithBody<bodyAuthModel>, res: Response) {
    const { loginOrEmail, password } = req.body;
	console.log("body", req.body)
    const checkResult = await userService.checkCridential(
      loginOrEmail,
      password
    );
	if(!checkResult) {
		return res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	} else {
		return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
	}
  }
);
