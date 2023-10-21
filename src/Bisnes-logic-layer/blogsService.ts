import { BlogsType } from './../routers/types/blogsType';
import { blogsRepositories } from "../repositories/blogs-db-repositories";
import { ObjectId } from "mongodb";


export const blogsService = {
  async createNewBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogsType> {
    const newBlog = {
	  _id: new ObjectId(),
      name,
      description,
      websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    const createBlog = await blogsRepositories.createNewBlogs(newBlog);
    return createBlog;
  },
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    return await blogsRepositories.updateBlogById(
      id,
      name,
      description,
      websiteUrl
    );
  },
//   async deletedBlog(id: string): Promise<boolean> {
//     return await blogsRepositories.deletedBlog(id);
//   },
  async deleteAllBlogs(): Promise<boolean> {
    return await blogsRepositories.deleteRepoBlogs();
  },
};
