import { blogsRepositories } from './../repositories/blogs-db-repositories';
import { BlogsType, blogsCollection } from "../db/db";

export const blogsService = {
	async createNewBlog(name: string, description: string, websiteUrl: string): Promise<BlogsType> {
		const newBlog = {
			id: new Date().toISOString(),
			name,
			description,
			websiteUrl,
			createdAt: new Date().toISOString(),
			isMembership: false
		}
		const createBlog = await blogsRepositories.createNewBlogs(newBlog)
		return createBlog
	}
}