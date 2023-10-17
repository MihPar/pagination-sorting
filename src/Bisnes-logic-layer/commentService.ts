import { commentCollection } from "../db/db"
import { commentRepositories } from "../repositories/comment-db-repositories"

export const commentService = {
	async updateCommentById(commentId: string, content: string) {
		const findCommentById = await commentRepositories.updateComment(commentId, content)
		return findCommentById
	},
	// async findCommentByPostId(postId: string, pageNumber: string, pageSize: string, sortBy: string, sortDirection: string) {
	// 	const findComment = await commentRepositories.findCommentByPostId(postId,pageNumber, pageSize, sortBy, sortDirection)
	// 	return findComment
	// }
}