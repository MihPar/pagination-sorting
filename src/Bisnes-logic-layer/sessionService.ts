import { ObjectId } from 'mongodb';
import { sessionRepositories } from "../repositories/session-db-repositories"

export const sessionService = {
	async findRefreshToken(refreshToken: string) {
		const findItem = await sessionRepositories.findRefreshToken(refreshToken)
		return findItem
	},
	async updateSession(currentUserId: ObjectId, newRefreshToken: string) {
		return await sessionRepositories.addRefreshToken(currentUserId, newRefreshToken)
	}
}