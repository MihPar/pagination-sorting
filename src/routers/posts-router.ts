import {
  inputPostBlogValidator,
  inputPostContentValidator,
  inputPostShortDescriptionValidator,
  inputPostTitleValidator,
} from "./../middleware/input-value-posts-middleware copy";
import { valueMiddleware } from "./../middleware/validatorMiddleware";
import { authorization } from "./../middleware/authorizatin";
import { PostsType } from "./../db/db";
import { Router, Request, Response } from "express";
import { postsQueryRepositories } from "../repositories/posts-query-repositories";
import { HTTP_STATUS } from "../utils";
import { postsService } from "../domain/postsService";

export const postsRouter = Router({});

postsRouter.get("/", async function (req: Request, res: Response): Promise<PostsType[]> {
  const {
    pageNumber = "1",
    pageSize = "10",
    sortBy = "createAt",
    sortDirection = "desc",
  } = req.query;
  const getAllPosts: PostsType[] = await postsQueryRepositories.findAllPosts(
    pageNumber as string,
    pageSize as string,
    sortBy as string,
    sortDirection as string
  );
  res.status(HTTP_STATUS.OK_200).send(getAllPosts);
});

postsRouter.post(
  "/",
  authorization,
  valueMiddleware,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  inputPostContentValidator,
  inputPostBlogValidator,
  async function (req: Request, res: Request): Promise<PostsType> {
    const { title, shortDescription, content, blogId } = req.body;
    const createNewPost: PostsType = await postsService.createPost(
      title,
      shortDescription,
      content,
      blogId
    );
    res.status(HTTP_STATUS.CREATED_201).send(createNewPost);
  }
);

postsRouter.get(
  "/:id",
  async function (req: Request, res: Response): Promise<boolean> {
    const getPostById: boolean = await postsQueryRepositories.findPostById(
      req.params.id
    );
    if (!getPostById) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    }
    res.status(HTTP_STATUS.OK_200).send(getPostById);
  }
);

postsService.put(
  "/:id",
  authorization,
  valueMiddleware,
  inputPostTitleValidator,
  inputPostShortDescriptionValidator,
  inputPostContentValidator,
  inputPostBlogValidator,
  async function (req: Request, res: Response): Promise<PostsType> {
    const { title, shortDescription, content, blogId } = req.body;
    const updatePost: PostsType = await postsService.updateOldPost(
      req.params.id,
      title,
      shortDescription,
      content,
      blogId
    );
    if (!updatePost) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);

postsRouter.delete(
  "/:id",
  authorization,
  async function (req: Request, res: Response): Promise<boolean> {
    const deletPost: PostsType = await postsService.deletePostId(req.params.id);
    if (!deletPost) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND_404);
    } else {
      res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
    }
  }
);