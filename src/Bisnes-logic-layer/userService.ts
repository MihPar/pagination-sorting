import { DBUserType, UserType } from './../routers/types/usersType';
import { userRepositories } from '../repositories/user-db-repositories';
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';

export const userService = {
	async createNewUser(login: string, password: string, email: string): Promise<UserType> {
		const passwordHash = await this._generateHash(password)

		const newUser: DBUserType = {
			_id: new ObjectId(),
			login: login,
			email: email,
			passwordHash,
			createdAt: new Date().toISOString()
		}
		
		const user: DBUserType = await userRepositories.createUser(newUser);
		return {
			id: user._id.toString(),
			login: user.login,
			email: user.email,
			createdAt: user.createdAt,
		};
	},
	async checkCridential(loginOrEmail: string, password: string) {
		const user: DBUserType | null = await userRepositories.findByLoginOrEmail(loginOrEmail)
		if(!user) return null
		const resultBcryptCompare: boolean = await bcrypt.compare(password, user.passwordHash)
		if (resultBcryptCompare !== true) return null
		return user
	},
	async _generateHash(password: string): Promise<string> {
		const hash: string = await bcrypt.hash(password, 10)
		return hash
	},
	
	async deleteUserId(id: string): Promise<boolean> {
		const deleteId: boolean = await userRepositories.deleteById(id)
		return deleteId
	},
	async findUserById(userId: ObjectId | null) {
		return await userRepositories.findUserById(userId)
	}
}