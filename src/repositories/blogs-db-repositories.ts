import { BlogsType, blogsCollection } from "./../db/db";

export const blogsRepositories = {
  async findBlogs(): Promise<BlogsType[]> {
    const filtered: any = {};
    return blogsCollection.find(filtered, { projection: { _id: 0 } }).toArray();
  },
  async createNewBlogs(newBlog: BlogsType): Promise<BlogsType> {
    const result = await blogsCollection.insertOne({ ...newBlog });
    return newBlog;
  },
  async updateBlogById(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await blogsCollection.updateOne(
      { id: id },
      { $set: { name: name, description: description, websiteUrl: websiteUrl } }
    );
    return result.upsertedCount === 1;
  },
  async deletedBlog(id: string): Promise<boolean> {
	const result = await blogsCollection.deleteOne({id: id})
	return result.deletedCount === 1
  }
};
