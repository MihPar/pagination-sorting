import { deleteAllRepositories } from "../repositories/delete_db_repositories"

export const deleteService = {
	async deleteAllPosts()  {
		const delPosts = deleteAllRepositories.deleteRepoPosts()
		return delPosts
	},
	async deleteAllBlogs()  {
		const delBlogs = deleteAllRepositories.deleteRepoBlogs()
		return delBlogs
	}
}