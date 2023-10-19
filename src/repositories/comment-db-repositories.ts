import { CommentTypeView } from './../routers/types/commentType';
import { PaginationType } from "./../routers/types/types";
import { CommentType } from "../routers/types/commentType";
import { commentCollection } from "./../db/db";
import { Filter, ObjectId, UpdateResult } from "mongodb";

export const commentRepositories = {
  async updateComment(commentId: string, content: string) {
    const updateOne = await commentCollection.updateOne(
      { _id: new ObjectId(commentId) },
      { $set: { content: content } }
    );
    return updateOne.modifiedCount === 1;
  },
  async deleteComment(commentId: string) {
    const deleteComment = await commentCollection.deleteOne({ _id: new ObjectId(commentId) });
    return deleteComment.deletedCount === 1;
  },
  async findCommentById(id: string): Promise<CommentType | null> {
    const commentById: CommentType | null = await commentCollection.findOne(
      { _id: new ObjectId(id) },
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
  ): Promise<PaginationType<CommentTypeView> | null> {
    const filter: Filter<CommentTypeView> = { postId: postId };
    const commentByPostId: CommentTypeView[] = await commentCollection
      .find(filter, { projection: { _id: 0 } })
      .sort({ [sortBy]: sortDirection === "desc" ? 1 : -1 })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .toArray();

	  if(!commentByPostId.length){
		return null
	  }

    const totalCount: number = await commentCollection.countDocuments(filter);
    const pagesCount: number = await Math.ceil(totalCount / +pageSize);

    return {
      pagesCount: pagesCount,
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: totalCount,
      items: commentByPostId,
    };
  },
  async updateCommentByPostId(
    postId: string,
    content: string
  ): Promise<boolean> {
    const updateComment: UpdateResult = await commentCollection.updateOne(
      { id: new ObjectId(postId) },
      { $set: { content: content } }
    );
    return updateComment.matchedCount === 1;
  },
  async createNewCommentPostId(newComment: CommentType): Promise<CommentTypeView> {
	const result = await commentCollection.insertOne({...newComment})
	const {postId, ...res} = newComment
	return {...res, id: res.id.toString()}
  }
};
