import { PostsType, blogsCollection, postsCollection } from "./../db/db";

export const postsRepositories = {
  async createNewBlogs(newPost: PostsType): Promise<PostsType> {
    const result = await postsCollection.insertOne({ ...newPost });
    return newPost;
  },
  async updatePost(
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    const result = await postsCollection.updateOne(
      { id: id },
      {
        $set: {
          title: title,
          shortDescription: shortDescription,
          content: content,
          blogId: blogId,
        },
      }
    );
    return result.modifiedCount === 1;
  },
  async deletedPostById(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
  async deleteRepoPosts(): Promise<boolean> {
    const deletedAll = await postsCollection.deleteMany({});
    return deletedAll.deletedCount === 1;
  },
};
