import { postsRepositories } from './../repositories/posts-db-repositories';
import { paramsPostsIdModel } from './../model/modelPosts/paramsPostsIdModel';
import { bodyPostsModel } from './../model/modelPosts/bodyPostsMode';
import { queryPostsModel } from './../model/modelPosts/queryPostsModel';
import { RequestWithParams, RequestWithBody, RequestWithParamsAndBody } from './../types';
import {
  inputPostBlogValidator,
  inputPostContentValidator,
  inputPostShortDescriptionValidator,
  inputPostTitleValidator,
} from "./../middleware/input-value-posts-middleware copy";
import { ValueMiddleware } from "./../middleware/validatorMiddleware";
import { authorization } from "./../middleware/authorizatin";
import { PostsType } from "./../db/db";
import { Router, Response } from "express";
import { HTTP_STATUS } from "../utils";
import { postsService } from "../domain/postsService";

export const postsRouter = Router({});

/********************************** get **********************************/

postsRouter.get("/", async function (req: RequestWithParams<queryPostsModel>, res: Response<PostsType[]>): Promise<Response<PostsType[]>> {
  const {
    pageNumber = "1",
    pageSize = "10",
    sortBy = "createAt",
    sortDirection = "desc",
  } = req.query;
  const getAllPosts: PostsType[] = await postsRepositories.findAllPosts(
    pageNumber as string,
    pageSize as string,
    sortBy as string,
    sortDirection as string
  );
  return res.status(HTTP_STATUS.OK_200).send(getAllPosts);
});

/********************************** post **********************************/

postsRouter.post(
  "/",
  authorization,
  ValueMiddleware,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  inputPostContentValidator,
  inputPostBlogValidator,
  async function (req: RequestWithBody<bodyPostsModel>, res: Response <PostsType>) {
    const { title, shortDescription, content, blogId } = req.body;
    const createNewPost: PostsType | null = await postsService.createPost(
      title,
      shortDescription,
      content,
      blogId
    );
	if(!createNewPost) return res.sendStatus(404)
    return res.status(HTTP_STATUS.CREATED_201).send(createNewPost);
  }
);

/********************************** get{id} **********************************/

postsRouter.get(
  "/:id",
  async function (req: RequestWithParams<paramsPostsIdModel>, res: Response<PostsType | null>) {
    const getPostById: PostsType | null = await postsRepositories.findPostById(
      req.params.id
    );
    if (!getPostById) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
      return res.status(HTTP_STATUS.OK_200).send(getPostById);
  }
);

/********************************** put{id} **********************************/

postsRouter.put(
  "/:id",
  authorization,
  ValueMiddleware,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  inputPostContentValidator,
  inputPostBlogValidator,
  async function (req: RequestWithParamsAndBody<paramsPostsIdModel, bodyPostsModel>, res: Response<boolean>) {
	const {id} = req.params
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
  async function (req: RequestWithParams<paramsPostsIdModel>, res: Response<void>) {
    const deletPost: boolean = await postsService.deletePostId(req.params.id);
    if (!deletPost) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);