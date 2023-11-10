import { IPAuthSessionCollection } from './../db/db';
import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import { CollectionIP } from './../UIRepresentation/types/deviceAuthSession';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils';


export const limitRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	// 	const IP = req.ip
	// 	const URL = req.originalUrl
	// 	const createAt = new Date().toDateString()
	// try {
	// 	const count = await IPAuthSessionCollection.countDocuments({
	// 		IP, 
	// 		URL, 
	// 		createAt: {$gte: (new Date(Date.now() - 10000))}
	// 	})
	// 	if (count >= 5) {
	// 		return res.sendStatus(HTTP_STATUS.HTTP_STATUS_429)
	// 	} 
	// 	await IPAuthSessionCollection.insertOne({IP, URL, createAt})
	// 	return next()
	// } catch(err) {
	// 	console.log(err)
	// 	res.status(HTTP_STATUS.NOT_WORK_SERVER_500)
	// }

	// const reqData: CollectionIP = new RequestCounter(req.ip, req.originalUrl, req.method)
	const reqData: CollectionIP = {
		IP: req.ip,
		URL: req.originalUrl,
		createAt: new Date(),
	}

	await securityDeviceRepositories.createCollectionIP(reqData)
    // await RequestCountsModel.create(reqData)

    // const tenSecondsAgo = new Date(Date.now() - 10000)
    const filter: any = {IP: reqData.IP, URL: reqData.URL, createdAt: {$gte: new Date(Date.now() - 10000)}}

    const count: number = await securityDeviceRepositories.countDocs(filter)
    if (count > 5) {
        return res.sendStatus(HTTP_STATUS.HTTP_STATUS_429)
    } 
	return next()
}