import { postsRepositories } from "../repositories/posts-db-repositories";
import { PostsType, blogsCollection, postsCollection } from "../db/db";

export const postsService = {
	async createPost(blogId: string, title: string, shortDescription: string, content: string): Promise<PostsType> {
		const blog: any = await blogsCollection.findOne({ id: blogId });
		const newPost: PostsType = {
			id: new Date().toISOString(),
			title,
			shortDescription,
			content,
			blogId,
			blogName: blog.name,
			createdAt: new Date().toISOString()
		}
		const post = await postsRepositories.createNewBlogs(newPost)
		return post
	},
	// async updateBlog(id: string, name: string, description: string, websiteUrl: string): Promise<boolean> {
	// 	return await blogsRepositories.updateBlogById(id, name, description, websiteUrl,)
	// },
	// async deletedBlog(id: string): Promise<boolean> {
	// 	return await blogsRepositories.deletedBlog(id)
	// }
}