import { UserType, DBUserType } from './../routers/types/usersType';
import { emailAdapter } from "../adapter/email-adapter"

export const emailManager = {
	async sendPasswordRecoviryMessage(user: any) {
		
	},
	async sendEamilConfirmationMessage(user: DBUserType): Promise<void> {
		//  save to repo
		// get user from repo
		const result = await emailAdapter.sendEmail(user.accountData.email, user.emailConfirmation.confirmationCode)
	}
}