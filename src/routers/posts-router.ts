import { paramsIdModel } from "./../model/modelPosts/paramsIdModel";
import { paramsPostIdMode } from "./../model/modelPosts/paramsPostIdMode";
import { postsRepositories } from "./../repositories/posts-db-repositories";
import { bodyPostsModel } from "./../model/modelPosts/bodyPostsMode";
import { queryPostsModel } from "./../model/modelPosts/queryPostsModel";
import {
  RequestWithParams,
  RequestWithBody,
  RequestWithParamsAndBody,
  RequestWithParamsAndQuery,
  PaginationType,
} from "./types/types";
import {
  inputPostBlogValidator,
  inputPostContentValidator,
  inputPostShortDescriptionValidator,
  inputPostTitleValidator,
} from "./../middleware/input-value-posts-middleware copy";
import { ValueMiddleware } from "./../middleware/validatorMiddleware";
import { authorization } from "./../middleware/authorizatin";
import { Router, Response } from "express";
import { HTTP_STATUS } from "../utils";
import { postsService } from "../Bisnes-logic-layer/postsService";
import { PostsType } from "./types/postsType";
import { commentService } from "../Bisnes-logic-layer/commentService";
import { CommentType, CommentTypeView } from "./types/commentType";
import { commentRepositories } from "../repositories/comment-db-repositories";
import { bodyPostModelContent } from "../model/modelPosts/bodyPostModeContent";
import { commentAuthorization } from "../middleware/commentAuthorization";
import { inputCommentValidator } from "../middleware/input-value-comment-middleware";

export const postsRouter = Router({});

/************************ get{postId}/comments *****************************/

postsRouter.get(
  "/:postId/comments",
  async function (
    req: RequestWithParamsAndQuery<paramsPostIdMode, queryPostsModel>,
    res: Response<PaginationType<CommentTypeView>>
  ) {
    const { postId } = req.params;
    const {
      pageNumber = "1",
      pageSize = "10",
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;
	
    const commentByPostsId: PaginationType<CommentTypeView> | null = await commentRepositories.findCommentByPostId(
      postId,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection
    );

    if (!commentByPostsId) {
    	res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
       	res.status(HTTP_STATUS.OK_200).send(commentByPostsId);
    }
  }
);

/************************ post{postId}/comment *****************************/

postsRouter.post(
  "/:postId/comments",
  commentAuthorization,
  inputCommentValidator,
  ValueMiddleware,
  async function (
    req: RequestWithParamsAndBody<paramsPostIdMode, bodyPostModelContent>,
    res: Response<CommentTypeView>
  ) {
    const { postId } = req.params;
    const { content } = req.body;
	const user = req.user;
	
    const post: PostsType | null =
      await postsRepositories.findPostById(postId);

    if (!post) return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);

    const createNewCommentByPostId: CommentTypeView| null =
      await commentService.createNewCommentByPostId(postId, content, user._id.toString(), user.login);

    if (!createNewCommentByPostId) {
    	return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
        return res.status(HTTP_STATUS.CREATED_201).send(createNewCommentByPostId);
    }
  }
);

/********************************** get **********************************/

postsRouter.get(
  "/",
  async function (
    req: RequestWithParams<queryPostsModel>,
    res: Response<PaginationType<PostsType>>
  ): Promise<Response<PaginationType<PostsType>>> {
    const {
      pageNumber = "1",
      pageSize = "10",
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;
    const getAllPosts: PaginationType<PostsType> =
      await postsRepositories.findAllPosts(
        pageNumber as string,
        pageSize as string,
        sortBy as string,
        sortDirection as string
      );
    return res.status(HTTP_STATUS.OK_200).send(getAllPosts);
  }
);

/********************************** post **********************************/

postsRouter.post(
  "/",
  authorization,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  inputPostContentValidator,
  inputPostBlogValidator,
  ValueMiddleware,
  async function (
    req: RequestWithBody<bodyPostsModel>,
    res: Response<PostsType>
  ) {
    const { title, shortDescription, content, blogId } = req.body;
    const createNewPost: PostsType | null = await postsService.createPost(
      blogId,
      title,
      shortDescription,
      content
    );
    if (!createNewPost) {
      return res.sendStatus(HTTP_STATUS.BAD_REQUEST_400);
    } else {
      return res.status(HTTP_STATUS.CREATED_201).send(createNewPost);
    }
  }
);

/********************************** get{id} **********************************/

postsRouter.get(
  "/:id",
  async function (
    req: RequestWithParams<paramsIdModel>,
    res: Response<PostsType | null>
  ) {
    const getPostById: PostsType | null = await postsRepositories.findPostById(
      req.params.id
    );
    if (!getPostById) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.status(HTTP_STATUS.OK_200).send(getPostById);
    }
  }
);

/********************************** put{id} **********************************/

postsRouter.put(
  "/:id",
  authorization,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  inputPostContentValidator,
  inputPostBlogValidator,
  ValueMiddleware,
  async function (
    req: RequestWithParamsAndBody<paramsIdModel, bodyPostsModel>,
    res: Response<boolean>
  ) {
    const { id } = req.params;
    const { title, shortDescription, content, blogId } = req.body;
    const updatePost: boolean = await postsService.updateOldPost(
      id,
      title,
      shortDescription,
      content,
      blogId
    );
    if (!updatePost) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

/********************************** delete{id} **********************************/

postsRouter.delete(
  "/:id",
  authorization,
  async function (req: RequestWithParams<paramsIdModel>, res: Response<void>) {
    const deletPost: boolean = await postsService.deletePostId(req.params.id);
    if (!deletPost) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);
