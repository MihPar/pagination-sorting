import { CollectionIP } from './../UIRepresentation/types/deviceAuthSession';
import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '../utils';


// export const limitRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     const reqData: CollectionIP = new RequestCounter(req.ip, req.originalUrl, req.method)

//     await RequestCountsModel.create(reqData)

//     const tenSecondsAgo = new Date(Date.now() - 10000)
//     const filter = {$and: [{ip: reqData.ip}, {URL: reqData.URL}, {createdAt: {$gte: tenSecondsAgo}}, {method: reqData.method}]}

//     const count = await RequestCountsModel.countDocuments(filter)
//     if (count > 5) {
//         return res.sendStatus(HTTP_STATUS.HTTP_STATUS_429)
//     } else {
//         return next()
//     }
// }