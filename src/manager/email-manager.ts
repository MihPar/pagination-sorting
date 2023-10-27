import { UserType, DBUserType } from './../routers/types/usersType';
import { emailAdapter } from "../adapter/email-adapter"

export const emailManager = {
	async sendEamilConfirmationMessage(user: DBUserType): Promise<void> {
		const result = await emailAdapter.sendEmail(user.accountData.email, user.emailConfirmation.confirmationCode)
		return result
	}
}