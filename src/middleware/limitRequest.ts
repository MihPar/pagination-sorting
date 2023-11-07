import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import { CollectionIP } from './../UIRepresentation/types/deviceAuthSession';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils';


export const limitRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // const reqData: CollectionIP = new RequestCounter(req.ip, req.originalUrl, req.method)
	const reqData: CollectionIP = {
		IP: req.ip,
		URL: req.originalUrl,
		createAt: new Date(),
		method: req.method
	}

	await securityDeviceRepositories.createCollectionIP(reqData)
    // await RequestCountsModel.create(reqData)

    const tenSecondsAgo = new Date(Date.now() - 10000)
    const filter = {$and: [{ip: reqData.IP}, {URL: reqData.URL}, {createdAt: {$gte: tenSecondsAgo}}, {method: reqData.method}]}

    const count = await securityDeviceRepositories.countDocs(filter)
    if (count > 5) {
        return res.sendStatus(HTTP_STATUS.HTTP_STATUS_429)
    } else {
        return next()
    }
}