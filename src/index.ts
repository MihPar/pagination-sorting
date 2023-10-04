import { runDb } from './db/db';
import { createApp } from './settings';
import dotenv from 'dotenv'
dotenv.config()

const app = createApp()
const port = process.env.PORT || 2000

const starting = async () => {
	await runDb()
	app.listen(port, function() {
		console.log(`Server was started at port ${port}`)
	})
}

starting()