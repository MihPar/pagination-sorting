import { blogsService } from './../domain/blogsService';
import { postsService } from './../domain/postsService';
import { Router, Request, Response } from "express";
import { HTTP_STATUS } from "../utils";

export const deleteAllRouter = Router({});

deleteAllRouter.delete(
  "/",
  async function (req: Request, res: Response): Promise<boolean> {
    await postsService.deleteAllPosts();
    await blogsService.deleteAllBlogs();
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);
