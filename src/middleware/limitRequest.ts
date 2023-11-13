import { Filter } from 'mongodb';
import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import { CollectionIP } from './../UIRepresentation/types/deviceAuthSession';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils';
import subSeconds from "date-fns/subSeconds";
import {config} from'dotenv'
config()

export const limitRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const reqData: CollectionIP = {
		IP: req.ip,
		URL: req.originalUrl,
		date: new Date(),
	}

	console.log('url/endpoit: ', reqData.URL)
	// console.log('IP: ', reqData.IP)

	await securityDeviceRepositories.createCollectionIP(reqData)
    // await RequestCountsModel.create(reqData)

    const tenSecondsAgo = new Date(Date.now() - 10000)
    const filter: Filter<CollectionIP> = {IP: reqData.IP, URL: reqData.URL, date: {$gt: tenSecondsAgo}}

    const count = await securityDeviceRepositories.countDocs(filter)
	// console.log('count devices: ', count)
	// console.log('IP: ', reqData.IP)
    if (count > 5) {
		console.log("count: ", count)
        res.sendStatus(HTTP_STATUS.HTTP_STATUS_429)
		return
    } 
	next()
}

// middlewate вывести в console.log(params, query, body)????