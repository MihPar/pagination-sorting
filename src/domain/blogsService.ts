import { blogsRepositories } from './../repositories/blogs-db-repositories';
import { BlogsType } from "../db/db";

export const blogsService = {
	async findBlogs(): Promise<BlogsType[]> {
		return blogsRepositories.findBlogs()
	}
}