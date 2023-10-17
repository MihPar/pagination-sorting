import { PaginationType } from './../routers/types/types';
import { CommentType} from "../routers/types/commentType";
import { commentCollection } from "./../db/db";
import { Filter } from 'mongodb';

export const commentRepositories = {
  async updateComment(commentId: string, content: string) {
    const findOne = await commentCollection.updateOne(
      { id: commentId },
      { $set: { content: content } }
    );
    return findOne.modifiedCount === 1;
  },
  async deleteComment(commentId: string) {
    const deleteComment = await commentCollection.deleteOne({ id: commentId });
    return deleteComment.deletedCount === 1;
  },
  async findCommentById(id: string): Promise<CommentType | null> {
    const commentById: CommentType | null = await commentCollection.findOne(
      { id: id },
      { projection: { _id: 0 } }
    );
    return commentById;
  },
  async findCommentByPostId(
    postId: string,
    pageNumber: string,
    pageSize: string,
    sortBy: string,
    sortDirection: string
  ): Promise<PaginationType<CommentType>> {
	const filter: Filter<CommentType> = {postId: postId}
	const commentByPostId = await commentCollection
	.find(filter, {projection: {_id: 0}})
	.sort({[sortBy]: sortDirection === 'desc' ? 1 : -1})
	.skip((+pageNumber - 1) * +pageSize)
	.limit(+pageSize)
	.toArray()

	const totalCount = await commentCollection.countDocuments(filter)
	const pageCount = await Math.ceil(totalCount / +pageSize)

	return {
		pageCount: pageCount,
		page: +pageNumber,
		pageSize: +pageSize,
		totalCount: totalCount,
		items: commentByPostId,
	}
  },
};
