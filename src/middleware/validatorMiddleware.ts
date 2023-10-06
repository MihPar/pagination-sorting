import { Request, Response, NextFunction } from "express";
import {ValidationError, validationResult} from 'express-validator'
import { HTTP_STATUS } from "../utils";

export const errorFormat = (error: ValidationError) => {
	switch(error.type) {
		case "field": 
		return {
			message: error.msg,
			field: error.path
		}
		default:
		return {
			message: error.msg,
			field: "None"
		}
	}
}

export const valueMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
	const errors = validationResult(req)
	if(!errors.isEmpty()) {
		const errorsMessage = errors.array({onlyFirstError: true}).map(item => {
			return errorFormat(item)
		})
		res.status(HTTP_STATUS.BAD_REQUEST_400).send({errorsMessage})
		return 
	} else {
		next()
	}
};
