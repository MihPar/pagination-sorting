import { ObjectId } from 'mongodb';
import { DeviceModel, DeviceViewModel } from './../UIRepresentation/types/deviceAuthSession';
import { deviceAuthSessionCollection, IPAuthSessionCollection } from './../db/db';

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
  async terminateSession(deviceId: ObjectId) {
	const deleteOne = await deviceAuthSessionCollection.deleteOne({deviceId: deviceId})
	return deleteOne.deletedCount === 1
  },
  async createDevice(device: DeviceModel): Promise<DeviceModel> {
	const resultDevice = await deviceAuthSessionCollection.insertOne({...device})
	return device
  },
  async findDeviceByDeviceId(deviceId: ObjectId) {
	return await deviceAuthSessionCollection.findOne({deviceId: deviceId})
  },
  async createCollectionIP(reqData: any) {
	await IPAuthSessionCollection.insertOne({...reqData})
	return reqData
  },
  async countDocs(filter: any) {
	await IPAuthSessionCollection.countDocuments({...filter})
	return filter
  }
};