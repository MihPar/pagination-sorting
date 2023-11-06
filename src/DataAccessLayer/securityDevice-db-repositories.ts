import { ObjectId } from 'mongodb';
import { DeviceModel, DeviceViewModel } from './../UIRepresentation/types/deviceAuthSession';
import { deviceAuthSessionCollection } from './../db/db';

export const securityDeviceRepositories = {
  async getDevicesAllUsers(userId: string): Promise<DeviceViewModel[]> {
    const getAllDevices: DeviceModel[] =
      await deviceAuthSessionCollection.find({ userId: userId }).toArray();
    
    return getAllDevices.map(function(item) {
			return {
				ip: item.ip,
				title: item.title,
				lastActiveDate: item.lastActiveDate,
				deviceId: item.deviceId,
		}
	})
  },
  async deleteDeviceById(deviceId: ObjectId) {
	const deleteOne = await deviceAuthSessionCollection.deleteOne({...deviceId})
	return deleteOne.deletedCount === 1
  },
  async terminateSession(deviceId: ObjectId) {
	const resultDelete = await deviceAuthSessionCollection.deleteOne({deviceId: deviceId})
        return resultDelete.deletedCount === 1
  },
  async createDevice(device: Device): Promise<Device> {
	const resultDevice = await deviceAuthSessionCollection.insertOne({...device})
	return device
  }
};