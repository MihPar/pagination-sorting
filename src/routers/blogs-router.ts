import { QueryBlogsModel } from '../models/queryBlogsModel';
import { blogsService } from './../domain/blogsService';
import {Router, Response} from 'express'
import { HTTP_STATUS } from '../utils'
import { BlogsType } from '../db/db'
import { blogsQueryRepositories } from '../repositories/blogs-query-repositories';
import { RequestWithQuery } from '../types';

export const blogsRouter = Router({})

blogsRouter.get('/', async function(req: RequestWithQuery<QueryBlogsModel>, res: Response) {
	const{serchNameTerm, pageNumber = '1', pageSize = '2', sortBy ='createdAt', sortDirection = 'desc'} = req.query;
	
	const getAllBlogs: BlogsType[] = await blogsQueryRepositories.findBlogs(serchNameTerm, pageNumber,pageSize, sortBy, sortDirection)
	res.status(HTTP_STATUS.OK_200).send(getAllBlogs)
})