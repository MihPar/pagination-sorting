import { postsService } from "./../domain/postsService";
import { postsQueryRepositories } from "./../repositories/posts-query-repositories";
import {
  inputBlogNameValidator,
  inputBlogDescription,
  inputBlogWebsiteUrl,
} from "./../middleware/input-value-blogs-middleware";
import { authorization } from "./../middleware/authorizatin";
import { valueMiddleware } from "./../middleware/validatorMiddleware";
import { blogsRepositories } from "./../repositories/blogs-db-repositories";
import { QueryBlogsModel } from "../models/queryBlogsModel";
import { blogsService } from "./../domain/blogsService";
import { Router, Request, Response } from "express";
import { HTTP_STATUS } from "../utils";
import { BlogsType, PostsType } from "../db/db";
import { blogsQueryRepositories } from "../repositories/blogs-query-repositories";
import { RequestWithQuery } from "../types";
import { inputPostContentValidator, inputPostShortDescriptionValidator, inputPostTitleValidator } from "../middleware/input-value-posts-middleware copy";

export const blogsRouter = Router({});

/********************************** get **********************************/

blogsRouter.get(
  "/",
  async function (req: RequestWithQuery<QueryBlogsModel>, res: Response) {
    const {
      serchNameTerm,
      pageNumber = "1",
      pageSize = "2",
      sortBy = "createdAt",
      sortDirection = "desc",
    } = req.query;
    const getAllBlogs: BlogsType[] = await blogsQueryRepositories.findBlogs(
      serchNameTerm,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection
    );
    res.status(HTTP_STATUS.OK_200).send(getAllBlogs);
  }
);

/********************************** post **********************************/

blogsRouter.post(
  "/",
  authorization,
  valueMiddleware,
  inputBlogNameValidator,
  inputBlogDescription,
  inputBlogWebsiteUrl,
  async function (req: Request, res: Response) {
    const createBlog = await blogsService.createNewBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    res.status(HTTP_STATUS.CREATED_201).send(createBlog);
  }
);

/********************************** get{blogId} **********************************/

blogsRouter.get("/:blogId/posts", async function (req: Request, res: Response) {
  const {
    pageNumber = "1",
    pageSize = "10",
    sortBy = "createAt",
    sortDirection = "desc",
  } = req.query;

  const { blogId } = req.params;

  const getPosts: PostsType[] = await postsQueryRepositories.findPostsByBlogsId(
    pageNumber as string,
    pageSize as string,
    sortBy as string,
    sortDirection as string,
    blogId
  );
  res.status(HTTP_STATUS.OK_200).send(getPosts);
});

/********************************** post{blogId/posts ****************************/

blogsRouter.post(
  "/:blogId/posts",
  authorization,
  valueMiddleware,
  inputPostContentValidator,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  async function (req: Request, res: Response) {
    const isCreatePost = await postsService.createPost(
      req.params.blogId,
      req.body.title,
      req.body.shortDescription,
      req.body.content
    );
  }
);

/********************************** get{id} *********************************/

blogsRouter.get("/:id", async function (req: Request, res: Response) {
  const blogById = await blogsQueryRepositories.findBlogById(req.params.id);
  if (!blogById) {
    res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
  } else {
    res.status(HTTP_STATUS.OK_200).send(blogById);
  }
});

/********************************** put{id} *********************************/

blogsRouter.put(
  "/:id",
  authorization,
  valueMiddleware,
  inputBlogNameValidator,
  inputBlogDescription,
  inputBlogWebsiteUrl,
  async function (req: Request, res: Response) {
    const isUpdateBlog = await blogsService.updateBlog(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (!isUpdateBlog) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

/********************************** delete{id} *********************************/

blogsRouter.delete(
  "/:id",
  authorization,
  async function (req: Request, res: Response) {
    const isDeleted = await blogsService.deletedBlog(req.params.id);
    if (!isDeleted) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);
