import { Router, Request, Response } from "express";
import { deleteService } from "../domain/deleteAllBlogsPostsService";
import { HTTP_STATUS } from "../utils";

export const deleteAllRouter = Router({});

deleteAllRouter.delete(
  "/",
  async function (req: Request, res: Response): Promise<boolean> {
    await deleteService.deleteAllPosts();
    await deleteService.deleteAllBlogs();
    res.sendStatus(HTTP_STATUS.NO_CONTENT_204);
  }
);
