import { ObjectId } from 'mongodb';
import { sessionCollection } from './../db/db';
import { sessionToken } from '../db/sessionToken';

// function findToken(item) {
// 	for(let char of sessionToken) {
// 		if(char === item) {
// 			return char
// 		}
// 	}
// }

export const sessionRepositories = {
	async findRefreshToken(refreshToken: string) {
		const result = await sessionCollection.find({sessionToken: [refreshToken]})
		return result
		// return findToken(refreshToken)
	},
	async addRefreshToken(currentUserId: ObjectId, newRefreshToken: string) {
		const result = await sessionCollection.updateOne({_id: currentUserId}, {$push: {sessionToken: newRefreshToken}})
	}
}