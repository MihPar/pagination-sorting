import { DeviceModel} from './../UIRepresentation/types/deviceAuthSession';
import { ObjectId } from 'mongodb';
import { jwtService } from './jwtService';
import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import { fromUnixTime } from 'date-fns';
import {format} from "date-fns-tz";

export const deviceService = {
	async terminateAllCurrentSessions(userId: string, deviceId: string) {
		const findSession = await securityDeviceRepositories.getDevicesAllUsers(userId)
		if(!findSession) {
			return false
		}
		for(let session of findSession) {
			if(session.deviceId !== deviceId) {
				await securityDeviceRepositories.terminateSession(session.deviceId)
			}
		}
		return true
	},
	async createDevice(ip: string, title: string, refreshToken: string): Promise<DeviceModel | null> {
		const payload = await jwtService.decodeRefreshToken(refreshToken)

		if(!payload){
			return null
		}

		const lastActiveDate = new Date().toISOString();
		console.log(payload, 'payload')

		// const unixTime = fromUnixTime(payload.iat!)
		// const activeDate = format(new Date(unixTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', {timeZone: 'UTC'})

		const device: DeviceModel = {
			ip: ip,
    		title: title,
    		deviceId: payload.deviceId,
    		userId: payload.userId,
			lastActiveDate: lastActiveDate,
		}
		
		const createDevice: DeviceModel = await securityDeviceRepositories.createDevice(device)
		return createDevice
	},
	// async allCurrentUsers(userId: string) {
	// 	const allUser = await securityDeviceRepositories.getDevicesAllUsers(userId)
	// }
	async updateDevice(userId: string) {
		await securityDeviceRepositories.updateDeviceUser(userId)
	}
}