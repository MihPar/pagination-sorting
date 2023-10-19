import { DBUserType } from './../routers/types/usersType';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';
dotenv.config()

export const jwtService = {
	async createJWT(user: DBUserType) {
		const accessToken = await jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {expiresIn: '30m'})
		return accessToken
	},
	async getUserIdByToken(accessToken: string) {
		try {
			const result: any = await jwt.verify(accessToken, process.env.JWT_SECRET!)
			return new ObjectId(result.userId)
		} catch(err) {
			return null
		}
	}
}