import { PostsType, postsCollection } from "./../db/db";

export const postsRepositories = {
  async createNewBlogs(newPost: PostsType): Promise<PostsType> {
	const result = await postsCollection.insertOne({...newPost});
    return newPost;
  },
//   async createNewBlogs(newBlog: BlogsType): Promise<BlogsType> {
//     const result = await blogsCollection.insertOne({ ...newBlog });
//     return newBlog;
//   },
//   async updateBlogById(
//     id: string,
//     name: string,
//     description: string,
//     websiteUrl: string
//   ): Promise<boolean> {
//     const result = await blogsCollection.updateOne(
//       { id: id },
//       { $set: { name: name, description: description, websiteUrl: websiteUrl } }
//     );
//     return result.upsertedCount === 1;
//   },
//   async deletedBlog(id: string): Promise<boolean> {
// 	const result = await blogsCollection.deleteOne({id: id})
// 	return result.deletedCount === 1
//   }
};
