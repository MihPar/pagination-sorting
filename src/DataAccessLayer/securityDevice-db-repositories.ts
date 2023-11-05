import { DeviceModel } from './../UIRepresentation/types/deviceAuthSession';
import { deviceAuthSessionCollection } from './../db/db';

export const securityDeviceRepositories = {
  async getDevicesAllUsers(userId: string): Promise<DeviceModel | null> {
    const getAllDevices: DeviceModel | null =
      await deviceAuthSessionCollection.findOne({ userId: userId });
    if (!getAllDevices) return null;
    return getAllDevices;
  },
  async deleteDeviceById(deviceId: string) {
	const deleteOne = await deviceAuthSessionCollection.deleteOne({deviceId})
	return deleteOne.deletedCount === 1
  },
  async terminateSession(deviceId: string) {
	const resultDelete = await deviceAuthSessionCollection.deleteOne({deviceId: deviceId})
        return resultDelete.deletedCount === 1
  }
};