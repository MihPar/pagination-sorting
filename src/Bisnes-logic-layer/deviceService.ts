import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';

export const deviceService = {
	async deleteDeviceId(deviceId: string) {
		const deleteById = await securityDeviceRepositories.deleteDeviceById(deviceId)
		if(!deleteById) {
			return false
		} else {
			return true
		}
	}
}