import { BlogsType, blogsCollection } from "../db/db"

export const blogsQueryRepositories = {
	async findBlogs(serchNameTerm: string | null, pageNumber: string, pageSize: string, sortBy: string, sortDirection: string): Promise<BlogsType[]> {
		
		const filtered: any = serchNameTerm ? {name: {$regex: /serchNameTerm/i}}: {};// todo finished filter				
		return blogsCollection
		.find(filtered, {projection: {_id: 0}})
		.sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
		.skip(+pageNumber)//todo find how we can skip
		.limit(+pageSize)
		.toArray()
	}
}