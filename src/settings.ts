import express from 'express'
import { blogsRouter } from './routers/blogs-router'
import { postsRouter } from './routers/posts-router'
import { deleteAllRouter } from './routers/deleteAll-router'

export const createApp = () => {
	const app = express()
	app.use(express())
	app.use('/posts', postsRouter)
	app.use('/blogs',  blogsRouter)
	app.use('/testing/all-data', deleteAllRouter)

	return app
}