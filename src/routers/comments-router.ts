import { paramsCommentMode } from './../model/modelComment/paramsCommentModel';
import { CommentType } from './types/commentType';
import { commentRepositories } from "./../repositories/comment-db-repositories";
import { commentAuthorization } from "./../middleware/commentAuthorization";
import { Router, Request, Response } from "express";
import { inputCommentValidator } from "../middleware/input-value-comment-middleware";
import { ValueMiddleware } from "../middleware/validatorMiddleware";
import { commentService } from "../Bisnes-logic-layer/commentService";
import { HTTP_STATUS } from "../utils";
import { RequestWithParams } from './types/types';

export const commentsRouter = Router({});

commentsRouter.put(
  "/:commentId",
  commentAuthorization,
  inputCommentValidator,
  ValueMiddleware,
  async function (req: Request, res: Response) {
    const { commentId } = req.params;
    const { content } = req.body;
    const createComment = await commentService.updateCommentById(
      commentId,
      content
    );
    if (!createComment) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
    return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);

commentsRouter.delete(
  "/:commentId",
  commentAuthorization,
  async function (req: Request, res: Response) {
    const deleteCommentById = await commentRepositories.deleteComment(
      req.params.commentId
    );
    if (!deleteCommentById) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

commentsRouter.get('/:id', async function(req: RequestWithParams<paramsCommentMode>, res: Response<CommentType | null>) {
	const getCommentById: CommentType | null = await commentRepositories.findCommentById(req.params.id)
	if(!getCommentById) {
		return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	} else {
		return res.status(HTTP_STATUS.OK_200).send(getCommentById)
	}
})