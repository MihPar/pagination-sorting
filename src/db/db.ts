import { BlogsType, DBUserType, PostsType} from './../types';

import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()


const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'
console.log(process.env.MONGO_URL)

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
export const userCollection = db.collection<DBUserType>('posts')