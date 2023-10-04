import { BlogsType, blogsCollection } from './../db/db';


export const blogsRepositories = {
	async findBlogs(): Promise<BlogsType[]> {
		const filtered: any = {}
		return blogsCollection.find(filtered, {projection: {_id: 0}}).toArray()
	}
}