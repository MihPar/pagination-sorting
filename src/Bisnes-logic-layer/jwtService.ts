import { DBUserType } from './../types';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';
dotenv.config()

export const jwtService = {
	async createJWT(checkResult: DBUserType) {
		const token = await jwt.sign({userId: checkResult._id}, process.env.JWT_SECRET!, {expiresIn: '1h'})
		return token
	},
	async getUserIdByToken(token: string) {
		try {
			const result: any = await jwt.verify(token, process.env.JWT_SECRET!)
			return new ObjectId(result.userId)
		} catch(err) {
			return null
		}
	}
}