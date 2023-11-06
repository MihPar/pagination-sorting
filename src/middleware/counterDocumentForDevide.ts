import { userService } from './../Bisnes-logic-layer/userService';
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils';
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';
dotenv.config()

  const counterDocuments = async function countDocumentsByFilter(req: Request, res: Response, next: NextFunction) {
	const refreshToken = req.cookies.refreshToken
	if(!refreshToken) {
		res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	}
	try {
		const result: any = await jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET!)
		if(result.userId) {
			const user = await userService.findUserById(new ObjectId(result.userId))
			if(!user) {
				res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
			}
		}

	} catch(err) {
		res.sendStatus(HTTP_STATUS.NOT_AUTHORIZATION_401)
	}
	const { IP, URL } = req.query;
	const currentDate = new Date();
	const tenSecondsAgo = new Date(currentDate.getTime() - 10 * 1000);
  
	const filteredDocuments = documents.filter((document) => {
	  return document.IP === IP && document.URL === URL && new Date(document.date) >= tenSecondsAgo;
	});
  
	res.locals.documentCount = filteredDocuments.length;
	next();
  }
  
  // Пример использования:
  app.get('/documents', countDocumentsByFilter, (req: Request, res: Response, next: NextFunction) => {
	const documentCount = res.locals.documentCount;
	res.send(`Количество документов по фильтру: ${documentCount}`);
  });