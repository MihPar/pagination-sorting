import { postsRepositories } from './../repositories/posts-db-repositories';
import { paramsBlogsModel } from "./../model/modelBlogs/paramsBlogsModel";
import { bodyPostsModel } from "./../model/modelPosts/bodyPostsMode";
import { queryPostsModel } from "./../model/modelPosts/queryPostsModel";
import {
  RequestWithParamsAndQuery,
  RequestWithParamsAndBody,
  RequestWithParams,
} from "./../types";
import { postsService } from "./../domain/postsService";
import {
  inputBlogNameValidator,
  inputBlogDescription,
  inputBlogWebsiteUrl,
} from "./../middleware/input-value-blogs-middleware";
import { authorization } from "./../middleware/authorizatin";
import { ValueMiddleware } from "./../middleware/validatorMiddleware";
import { blogsService } from "./../domain/blogsService";
import { Router, Response } from "express";
import { HTTP_STATUS } from "../utils";
import { BlogsType, PostsType } from "../db/db";
import { RequestWithBody, RequestWithQuery } from "../types";
import {
  inputPostContentValidator,
  inputPostShortDescriptionValidator,
  inputPostTitleValidator,
} from "../middleware/input-value-posts-middleware copy";
import { paramsPostsModelBlogId } from "../model/modelPosts/paramsPostsModeBlogId";
import { QueryBlogsModel } from "../model/modelBlogs/QueryBlogsModel";
import { bodyBlogsModel } from "../model/modelBlogs/bodyBlogsModel";
import { blogsRepositories } from "../repositories/blogs-db-repositories";

export const blogsRouter = Router({});

/********************************** get **********************************/

blogsRouter.get(
  "/",
  async function (
    req: RequestWithQuery<QueryBlogsModel>,
    res: Response<BlogsType[]>
  ):Promise<Response<BlogsType[]>> {
    const {
      serchNameTerm,
      pageNumber = "1",
      pageSize = "10",
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;
    const getAllBlogs: BlogsType[] = await blogsRepositories.findAllBlogs(
      serchNameTerm,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection
    );
    return res.status(HTTP_STATUS.OK_200).send(getAllBlogs);
  }
);

/********************************** post **********************************/

blogsRouter.post(
  "/",
  authorization,
  ValueMiddleware,
  inputBlogNameValidator,
  inputBlogDescription,
  inputBlogWebsiteUrl,
  async function (
    req: RequestWithBody<bodyBlogsModel>,
    res: Response<BlogsType>
  ) {
    const createBlog: BlogsType = await blogsService.createNewBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    return res.status(HTTP_STATUS.CREATED_201).send(createBlog);
  }
);

/********************************** get{blogId/posts} *******************************/

blogsRouter.get(
  "/:blogId/posts",
  async function (
    req: RequestWithParamsAndQuery<paramsPostsModelBlogId, queryPostsModel>,
    res: Response<PostsType[]>
  ) {
    const {
      pageNumber = "1",
      pageSize = "10",
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;

    const { blogId } = req.params;

	const blog = await blogsRepositories.findBlogById(blogId)
	if(!blog) return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)

    const getPosts: PostsType[] =
      await postsRepositories.findPostsByBlogsId(
        pageNumber as string,
        pageSize as string,
        sortBy as string,
        sortDirection as string,
        blogId as string
      );
	  if(!getPosts) {
		return res.sendStatus(HTTP_STATUS.NOT_FOUND_404)
	  } else {
		return res.status(HTTP_STATUS.OK_200).send(getPosts);
	  }
  }
);

/********************************** post{blogId/posts} ***************************/

blogsRouter.post(
  "/:blogId/posts",
  authorization,
  ValueMiddleware,
  inputPostContentValidator,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  async function (
    req: RequestWithParamsAndBody<paramsPostsModelBlogId, bodyPostsModel>,
    res: Response<PostsType>
  ): Promise<Response<PostsType>> {
    const { blogId } = req.params;
    const { title, shortDescription, content } = req.body;

	const blog = await blogsRepositories.findBlogById(blogId)
	if(!blog) return res.sendStatus(404)

    const isCreatePost = await postsService.createPost(
      blogId,
      title,
      shortDescription,
      content
    );
    if (!isCreatePost) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.status(HTTP_STATUS.CREATED_201).send(isCreatePost);
    }
  }
);

/********************************** get{id} *********************************/

blogsRouter.get(
  "/:id",
  async function (
    req: RequestWithParams<paramsBlogsModel>,
    res: Response<BlogsType | null>
  ) {
    const blogById: BlogsType | null =
      await blogsRepositories.findBlogById(req.params.id);
    if (!blogById) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.status(HTTP_STATUS.OK_200).send(blogById);
    }
  }
);

/********************************** put{id} *********************************/

blogsRouter.put(
  "/:id",
  authorization,
  ValueMiddleware,
  inputBlogNameValidator,
  inputBlogDescription,
  inputBlogWebsiteUrl,
  async function (
    req: RequestWithParamsAndBody<paramsBlogsModel, bodyBlogsModel>,
    res: Response<void>
  ) {
    const { id } = req.params;
    const { name, description, websiteUrl } = req.body;
    const isUpdateBlog: boolean = await blogsService.updateBlog(
      id,
      name,
      description,
      websiteUrl
    );
    if (!isUpdateBlog) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

/********************************** delete{id} *********************************/

blogsRouter.delete(
  "/:id",
  authorization,
  async function (
    req: RequestWithParams<paramsBlogsModel>,
    res: Response<void>
  ) {
    const isDeleted: boolean = await blogsService.deletedBlog(req.params.id);
    if (!isDeleted) {
      return res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);
