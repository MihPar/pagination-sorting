import { Filter } from 'mongodb';
import { IPAuthSessionCollection } from './../db/db';
import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import { CollectionIP } from './../UIRepresentation/types/deviceAuthSession';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils';
import subSeconds from "date-fns/subSeconds";


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
	// const tenSeconds = new Date(Date.now() - 10000)

	const reqData: CollectionIP = {
		IP: req.ip,
		URL: req. baseUrl + req. url || req. originalUrl,
		date: new Date(),
	}

	console.log('url/endpoit: ', reqData.URL)

	await securityDeviceRepositories.createCollectionIP(reqData)
    // await RequestCountsModel.create(reqData)

    // const tenSecondsAgo = new Date(Date.now() - 100000
    const filter: Filter<CollectionIP> = {IP: reqData.IP, URL: reqData.URL, date: {$gt: subSeconds(new Date(), 10)}}

    const count = await securityDeviceRepositories.countDocs(filter)
    if (count > 5) {
        return res.sendStatus(HTTP_STATUS.HTTP_STATUS_429)
    } 
	next()
	return 
}

// middlewate вывести в console.log(params, query, body)????