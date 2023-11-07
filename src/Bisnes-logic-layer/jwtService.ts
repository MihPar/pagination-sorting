import { DBUserType } from '../UIRepresentation/types/usersType';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ObjectId } from 'mongodb';
dotenv.config()

export const jwtService = {
	async createJWT(user: DBUserType) {
		const token: string = await jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {expiresIn: '10s'})
		return token
	},
	async createRefreshJWT(userId: string, existDeviceId?: ObjectId) {
		// console.log('secret in login:', process.env.REFRESH_JWT_SECRET!)
		const deviceId: ObjectId = new ObjectId()
		const refreshToken: string = await jwt.sign({deviceId: existDeviceId ?? deviceId, userId}, process.env.REFRESH_JWT_SECRET as string, {expiresIn: '20s'})
		return refreshToken
	},
	async getUserIdByToken(token: string) {
		try {
			const result: any = await jwt.verify(token, process.env.JWT_SECRET!)
			return new ObjectId(result.userId)
		} catch(err) {
			return null
		}
	},
	async getUserIdByRefreshToken(refreshToken: string) {
		try {
			 const result: any = await jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET!)
			 return new ObjectId(result.userId)
		} catch(err) {
			return null
		}
	},
	async decodeRefreshToken(refreshToken: string) {
		try {
			 const result: any = jwt.decode(refreshToken)
			 console.log('decoded token:',result)
			 return result
		} catch(err) {
			return null
		}
	},
}