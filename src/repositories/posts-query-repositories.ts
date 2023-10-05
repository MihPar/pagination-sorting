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
	}
}