import { postsRepositories } from "../repositories/posts-db-repositories";
import { BlogsType, PostsType, blogsCollection } from "../db/db";
import { randomUUID } from "crypto";

export const postsService = {
  async createPost(
    blogId: string,
    title: string,
    shortDescription: string,
    content: string
  ): Promise<PostsType | null> {
    const blog: BlogsType | null = await blogsCollection.findOne({
      id: blogId,
    });
    if (!blog) return null;
    const newPost: PostsType = {
      id: randomUUID(),
      title,
      shortDescription,
      content,
      blogId,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    const post = await postsRepositories.createNewBlogs(newPost);
    return post;
  },
  async updateOldPost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    const updatPostById = await postsRepositories.updatePost(
      id,
      title,
      shortDescription,
      content,
      blogId
    );
    return updatPostById;
  },
  async deletePostId(id: string): Promise<boolean> {
    return await postsRepositories.deletedPostById(id);
  },
  async deleteAllPosts(): Promise<boolean> {
    return await postsRepositories.deleteRepoPosts();
  },
};
