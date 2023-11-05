import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';

export const deviceService = {
	async deleteDeviceId(deviceId: string, userId: string) {
		const findSessions = await securityDeviceRepositories.getDevicesAllUsers(deviceId)
		if(!findSessions) {
			return false
		}
		if(findSessions.userId !== userId) {
			return false
		}
		const deleteById = await securityDeviceRepositories.terminateSession(deviceId)
		if(!deleteById) {
			return false
		}
		return true
	},
	async deleteAllDevice(userId: string, deviceId: string) {
		const findSessions = await securityDeviceRepositories.getDevicesAllUsers(userId)
		if(!findSessions) {
			return false
		}
		for(let session of findSessions) {
			if(session.deviceId === deviceId) {
				await securityDeviceRepositories.terminateSession(session.deviceId)
			}
			return true
		}
		return true
	}
}