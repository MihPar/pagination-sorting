import { postsRepositories } from "../repositories/posts-db-repositories";
import { PostsType, blogsCollection} from "../db/db";

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
	async updateOldPost(id: string, title: string, shortDescription: string, content: string, blogId: string): Promise<boolean> {
		const updatPostById = await postsRepositories.updatePost(id, title, shortDescription, content, blogId)
		return updatPostById
	},
	async deletePostId(id: string): Promise<boolean> {
		return await postsRepositories.deletedPostById(id)
	},
	async deleteAllPosts()  {
		const delPosts = postsRepositories.deleteRepoPosts()
		return delPosts
	},
}