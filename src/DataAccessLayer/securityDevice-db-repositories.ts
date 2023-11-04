import { CurrentUser } from './../UIRepresentation/types/deviceAuthSession';
import { deviceAuthSessionCollection } from './../db/db';
export const securityDeviceRepositories = {
	async getDevicesAllUsers(): Promise<CurrentUser | null> {
	 	const getAllUsers = await deviceAuthSessionCollection.findOne()
		if(!getAllUsers) return null
		// const users = getAllUsers.map(function(item) {
		// 	return {
		// 		ip: item.IP,
		// 		title: item.title,
		// 		lastActiveDate: item.lastActiveDate,
		// 		deviceId: item.deviceId
		// 	}
		// })
		// return users
		
	}
}