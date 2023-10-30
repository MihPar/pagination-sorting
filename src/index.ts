import { runDb } from './db/db';
import { app } from './settings';
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000

const starting = async () => {
	await runDb()
	app.listen(port, function() {
		console.log(`Server was started at port ${port}`)
	})
	// console.log(jwt.sign({userId: 'custom user id'}, process.env.JWT_SECRET!, {expiresIn: '1h'}))
}

starting()