import { ObjectId } from "mongodb";
import { commentCollection, postsCollection, userCollection } from "../db/db";
import { commentRepositories } from "../repositories/comment-db-repositories";
import { CommentType } from "../routers/types/commentType";
import { DBUserType, UserGeneralType, UserType } from "../routers/types/usersType";

export const commentService = {
  async updateCommentByCommentId(commentId: string, content: string) {
	const findCommentId = await commentCollection.findOne({_id: new ObjectId(commentId)})
	
	if(!findCommentId) return false
    const updateCommentId = await commentRepositories.updateComment(
      commentId,
      content
    );
    return updateCommentId;
  },
  
  async createNewCommentByPostId(
    postId: string,
    content: string
  ): Promise<CommentType | null> {
	const user: DBUserType | null = await userCollection.findOne({_id: new ObjectId(postId)})

	if(!user) return null

    const newComment = {
      id: new ObjectId(),
      content: content,
      commentatorInfo: {
        userId: user._id,
        userLogin: user.login,
      },
	  postId,
      createdAt: new Date().toISOString(),
    };

    return await commentRepositories.createNewCommentPostId(newComment);
  },
};
