import { DeviceModel} from './../UIRepresentation/types/deviceAuthSession';
import { ObjectId } from 'mongodb';
import { jwtService } from './jwtService';
import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';

export const deviceService = {
	// async deleteDeviceId(deviceId: ObjectId) {
	// 	const findSessions = await securityDeviceRepositories.findDeviceByDeviceId(deviceId)
	// 	if(!findSessions) {
	// 		return false
	// 	}
	// 	if(findSessions.userId !== userId) {
	// 		return false
	// 	}
	// 	const deleteById = await securityDeviceRepositories.terminateSession(deviceId)
	// 	if(!deleteById) {
	// 		return false
	// 	}
	// 	return true
	// },
	async deleteAllDevice(userId: string, deviceId: string) {
		const findSessions = await securityDeviceRepositories.getDevicesAllUsers(userId)
		if(!findSessions) {
			return false
		}
		// for(let session of findSessions) {
		// 	if(session.deviceId === deviceId) {
		// 		await securityDeviceRepositories.terminateSession(session.deviceId)
		// 	}
		// 	return true
		// }
		return true
	},
	async createDevice(ip: string, title: string, refreshToken: string): Promise<DeviceModel> {
		const payload = await jwtService.decodeRefreshToken(refreshToken)
		const device: DeviceModel = {
			ip: ip,
    		title: title,
    		deviceId: payload.deviceId,
    		userId: payload.userId,
			lastActiveDate: payload.lastActiveDate,
		}
		const createDevice: DeviceModel = await securityDeviceRepositories.createDevice(device)
		return createDevice
	},
	
}