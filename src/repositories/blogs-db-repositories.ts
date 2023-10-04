import { BlogsType, blogsCollection } from './../db/db';


export const blogsRepositories = {
	async findBlogs(): Promise<BlogsType[]> {
		const filtered: any = {}
		return blogsCollection.find(filtered, {projection: {_id: 0}}).toArray()
	},
	async createNewBlogs(newBlog: BlogsType): Promise<BlogsType> {
		const result = await blogsCollection.insertOne({...newBlog});
		return newBlog;
	}
}