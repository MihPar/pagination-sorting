import { NextFunction, Response } from 'express';
import { ParamsUserMode } from '../model/modelUser/paramsUserModel';
import { RequestWithParams } from '../UIRepresentation/types/types';
import { HTTP_STATUS } from '../utils';

export const checkId = function(req: RequestWithParams<ParamsUserMode>, res: Response<void>, next: NextFunction) {
	if(!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).test(req.params.id)) {
		return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	} 
	next()
	return
}