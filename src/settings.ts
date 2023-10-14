import { usersRouter } from './routers/user-router';
import express from 'express'
import { blogsRouter } from './routers/blogs-router'
import { postsRouter } from './routers/posts-router'
import { deleteAllRouter } from './routers/deleteAll-router'
import { authRouter } from './routers/auth-router'


	export const app = express()

	app.use(express.json());

	app.use('/posts', postsRouter)
	app.use('/blogs',  blogsRouter)
	app.use('/testing/all-data', deleteAllRouter)
	app.use('/auth/login', authRouter)
	app.use('/users', usersRouter)

	app.get('/test', (req, res) => {
		res.json({ message: 'This is a test endpoint!' });
	});
