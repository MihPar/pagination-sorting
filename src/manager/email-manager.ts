import { UserType, DBUserType } from './../routers/types/usersType';
import { emailAdapter } from "../adapter/email-adapter"

export const emailManager = {
	async sendPasswordRecoviryMessage(user: any) {
		
	},
	async sendEamilConfirmationMessage(user: DBUserType): Promise<void> {
		//  save to repo
		// get user from repo
		const result = await emailAdapter.sendEmail('mpara7274@gmail.com', 'Lesson 7-th', '<div>Hello Express.js</div>')
		return result
	}
}