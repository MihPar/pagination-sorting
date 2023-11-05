import { ObjectId } from 'mongodb';
import { Device } from './../UIRepresentation/types/deviceAuthSession';
import { deviceAuthSessionCollection } from './../db/db';

export const securityDeviceRepositories = {
  async getDevicesAllUsers(userId: string): Promise<Device | null> {
    const getAllDevices: Device | null =
      await deviceAuthSessionCollection.findOne({ userId: userId });
    if (!getAllDevices) return null;
    return getAllDevices;
  },
  async deleteDeviceById(deviceId: string) {
	const deleteOne = await deviceAuthSessionCollection.deleteOne({deviceId})
	return deleteOne.deletedCount === 1
  },
  async terminateSession(deviceId: ObjectId) {
	const resultDelete = await deviceAuthSessionCollection.deleteOne({deviceId: deviceId})
        return resultDelete.deletedCount === 1
  },
  async createDevice(device: Device) {
	const resultDevice = await deviceAuthSessionCollection.insertOne({...device})
	return device
  }
};