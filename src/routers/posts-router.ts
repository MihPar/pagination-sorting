import {Router, Request, Response} from 'express'

export const postsRouter = Router({})

postsRouter.get('/', function(req: Request, res: Response) {
	res.status(200).send('fjwfsdfsdiofsdifsdiofsdiofsdiofsdiofuseiofdiofsdiof')
})