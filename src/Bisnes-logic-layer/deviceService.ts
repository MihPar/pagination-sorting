import { DeviceModel} from './../UIRepresentation/types/deviceAuthSession';
import { ObjectId } from 'mongodb';
import { jwtService } from './jwtService';
import { securityDeviceRepositories } from './../DataAccessLayer/securityDevice-db-repositories';
import { fromUnixTime } from 'date-fns';
import {format} from "date-fns-tz";

export const deviceService = {
	async terminateAllCurrentSessions(userId: string, deviceId: ObjectId) {
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
	async createDevice(ip: string, title: string, refreshToken: string): Promise<DeviceModel> {
		const payload = await jwtService.decodeRefreshToken(refreshToken)

		const unixTime = fromUnixTime(payload.exp)
		const activeDate = format(new Date(unixTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', {timeZone: 'UTC'})

		const device: DeviceModel = {
			ip: ip,
    		title: title,
    		deviceId: payload.deviceId,
    		userId: payload.userId,
			lastActiveDate: activeDate,
			issuedAt: payload.exp
		}
		
		
		const createDevice: DeviceModel = await securityDeviceRepositories.createDevice(device)
		console.log('service create device:', createDevice)
		return createDevice
	},
	async allCurrentUsers(userId: string) {
		const allUser = await securityDeviceRepositories.getDevicesAllUsers(userId)
	}
}