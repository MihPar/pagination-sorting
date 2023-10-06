import { BlogsType, blogsCollection } from "./../db/db";
import { Filter } from "mongodb";

export const blogsRepositories = {
  async findAllBlogs(
    serchNameTerm: string | null,
    pageNumber: string,
    pageSize: string,
    sortBy: string,
    sortDirection: string
  ): Promise<BlogsType[]> {
    const filtered: Filter<BlogsType> = serchNameTerm
      ? { name: { $regex: /serchNameTerm/i } }
      : {}; // todo finished filter
    const blogs = await blogsCollection
      .find(filtered, { projection: { _id: 0 } })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((+pageNumber - 1) * +pageSize) //todo find how we can skip
      .limit(+pageSize)
      .toArray();

    const totalCount: number = await blogsCollection.countDocuments(filtered);
    const pagesCount: number = Math.ceil(totalCount / +pageSize);

	type Type = {
		pagesCount: number
		page: number
		pageSize: number
		totalCount: number
		items: Array<BlogsType>
	}

	let result: Type = {
		pagesCount: pagesCount,
		page: +pageNumber,
		pageSize: +pageSize,
		totalCount: totalCount,
		items: blogs,
	}
    return result

  },
  async findBlogById(id: string): Promise<BlogsType | null> {
    return blogsCollection.findOne({ id: id }, { projection: { _id: 0 } });
  },
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
    return result.modifiedCount === 1;
  },
  async deletedBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
  async deleteRepoBlogs(): Promise<boolean> {
    const deletedAll = await blogsCollection.deleteMany({});
    return deletedAll.deletedCount === 1;
  },
};
