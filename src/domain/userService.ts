import { userRepositories } from '../repositories/user-db-repositories';
import { UserType } from './../types';
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';

export const userService = {
	async checkCridential(loginOrEmail: string, password: string) {
		const user: any = await userRepositories.findByLoginOrEmail(loginOrEmail)
		if(!user) return false
		const passwordHash = await this._generateHash(password, user.passwordSalt)
		if(user.passwordHash !== passwordHash) {
			return false
		}
		return true
	},
	async _generateHash(password: string, salt: string) {
		const hash = await bcrypt.hash(password, salt)
		return hash
	},
	async createNewUser(login: string, password: string, email: string): Promise<UserType> {
		const passwordSalt = await bcrypt.genSalt(10)
		const passwordHash = await this._generateHash(password, passwordSalt)

		const newUser: UserType = {
			id: new ObjectId(),
			login: login,
			email: email,
			passwordHash,
			passwordSalt,
			createdAt: new Date().toISOString()
		}
		return userRepositories.createUser(newUser)
	},
	async deleteUserId(id: string): Promise<boolean> {
		const deleteId = await userRepositories.deleteById(id)
		return deleteId
	}
}