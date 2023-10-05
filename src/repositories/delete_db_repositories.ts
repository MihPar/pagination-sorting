import { blogsCollection, postsCollection } from "../db/db"

export const deleteAllRepositories = {
  async deleteRepoPosts() {
    const deletedAll = await postsCollection.deleteMany({});
	return deletedAll.deletedCount === 1
  },
  async deleteRepoBlogs() {
    const deletedAll = await postsCollection.deleteMany({});
	return deletedAll.deletedCount === 1
  },
};