import { CommentTypeView } from './../routers/types/commentType';
import { ObjectId } from "mongodb";
import { commentCollection, postsCollection, userCollection } from "../db/db";
import { commentRepositories } from "../repositories/comment-db-repositories";
import { CommentType } from "../routers/types/commentType";
import { DBUserType, UserGeneralType, UserType } from "../routers/types/usersType";

export const commentService = {
  async updateCommentByCommentId(commentId: string, content: string) {
    const updateCommentId = await commentRepositories.updateComment(
      commentId,
      content
    );
    return updateCommentId;
  },
  async createNewCommentByPostId(
    postId: string,
    content: string,
	userId: string,
	userLogin: string
  ): Promise<CommentTypeView | null> {
	
    const newComment = {
      _id: new ObjectId(),
      content: content,
      commentatorInfo: {
        userId,
        userLogin,
      },
	  postId,
      createdAt: new Date().toISOString(),
    };
    return await commentRepositories.createNewCommentPostId(newComment);
  },
};
