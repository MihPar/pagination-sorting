import { Filter } from "mongodb"
import { PostsType, blogsCollection, postsCollection } from "../db/db"

export const postsQueryRepositories = {
	async findPostsByBlogsId(pageNumber: string, pageSize: string, sortBy: string, sortDirection: string, blogId: string): Promise<PostsType[]> {
		const filter: Filter<PostsType> = {blogId: blogId}
		const posts = await postsCollection.find(filter, {projection: {_id: 0}})
		.sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
		.skip(+pageNumber)//todo find how we can skip
		.limit(+pageSize)
		.toArray()
		return posts
	},
	async findAllPosts(pageNumber: string, pageSize: string,
		sortBy: string, sortDirection: string): Promise<PostsType[]> {
			const filter: any = {}
			return await postsCollection
			.find(filter, {projection: {_id: 0}})
			.sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
			.skip(+pageNumber)
			.limit(+pageSize)
			.toArray()
			
		},
		async findPostById(id: string): Promise<PostsType | null> {
			return postsCollection.findOne({id: id}, {projection: {_id: 0}})
		}
}