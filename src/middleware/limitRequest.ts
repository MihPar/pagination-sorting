import { Filter } from 'mongodb';
import { IPAuthSessionCollection } from './../db/db';
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
		URL: req. baseUrl + req. url || req. originalUrl,
		date: new Date(),
	}

	console.log('url/endpoit: ', reqData.URL)

	await securityDeviceRepositories.createCollectionIP(reqData)
    // await RequestCountsModel.create(reqData)

    // const tenSecondsAgo = new Date(Date.now() - 100000
    const filter: Filter<CollectionIP> = {IP: reqData.IP, URL: reqData.URL, date: {$gt: subSeconds(new Date(), 10)}}

    const count = await securityDeviceRepositories.countDocs(filter)
	console.log('count devices: ', count)
    if (count > 5) {
        res.sendStatus(HTTP_STATUS.HTTP_STATUS_429)
		return
    } 
	next()
}

// middlewate вывести в console.log(params, query, body)????