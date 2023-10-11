import { usersRouter } from './routers/user-router';
import express from 'express'
import { blogsRouter } from './routers/blogs-router'
import { postsRouter } from './routers/posts-router'
import { deleteAllRouter } from './routers/deleteAll-router'
import  bodyParser from 'body-parser'
import { authRouter } from './routers/auth-router'

export const createApp = () => {
	const app = express()
	const jsonParserMiddleware = bodyParser.json();
	app.use(jsonParserMiddleware);
	app.use(express())
	app.use('/posts', postsRouter)
	app.use('/blogs',  blogsRouter)
	app.use('/testing/all-data', deleteAllRouter)
	app.use('/auth/login', authRouter)
	app.use('/users', usersRouter)

	return app
}