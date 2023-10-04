import { MongoClient } from 'mongodb'
import {config} from 'dotenv'

config()

export type BlogsType = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};

  export type PostsType = {
	id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
  }


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
export const blogsCollection = db.collection<BlogsType>('blogs')
export const postsCollection = db.collection<PostsType>('posts')