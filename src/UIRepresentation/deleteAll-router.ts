import { blogsService } from '../Bisnes-logic-layer/blogsService';
import { postsService } from '../Bisnes-logic-layer/postsService';
import { Router, Request, Response } from "express";
import { HTTP_STATUS } from "../utils";
import { userService } from '../Bisnes-logic-layer/userService';

export const deleteAllRouter = Router({});

deleteAllRouter.delete(
  "/",
  async function (req: Request, res: Response<void>): Promise<Response<void>> {
    await postsService.deleteAllPosts();
    await blogsService.deleteAllBlogs();
	await userService.deleteAllUsers()
    return res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);