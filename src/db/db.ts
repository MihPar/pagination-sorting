import { commentType } from './../routers/types/commentType';
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import { BlogsType } from '../routers/types/blogsType';
import { PostsType } from '../routers/types/postsType';
import { DBUserType } from '../routers/types/usersType';

dotenv.config()


const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
// console.log(process.env.MONGO_URL)

export const client = new MongoClient(mongoURI)
export const db = client.db('bd')
export async function runDb() {
	try {
		await client.connect()
		await db.command({ping: 1})
		console.log('Connect successfully to mongo server')
	} catch(e) {
		console.log('Cann`t to connect to db:', e)
		await client.close()
	}
}

export const stopDb = async () => {
	await client.close()
}

export const blogsCollection = db.collection<BlogsType>('blogs')
export const postsCollection = db.collection<PostsType>('posts')
export const userCollection = db.collection<DBUserType>('user')
export const commentCollection = db.collection<commentType>('comment')