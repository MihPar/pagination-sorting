import { userRepositories } from '../repositories/user-db-repositories';
import { UserType, DBUserType, UserGeneralType } from './../types';
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';

export const userService = {
	async createNewUser(login: string, password: string, email: string): Promise<UserType> {
		// const passwordSalt = await bcrypt.genSalt(10)
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
		const user: any = await userRepositories.findByLoginOrEmail(loginOrEmail)
		if(!user) return false
		const passwordHash = await this._generateHash(password)
		if(user.passwordHash !== passwordHash) {
			return false
		}
		return true
	},
	async _generateHash(password: string) {
		const hash = await bcrypt.hash(password, 10)
		return hash
	},
	
	async deleteUserId(id: string): Promise<boolean> {
		const deleteId = await userRepositories.deleteById(id)
		return deleteId
	}
}