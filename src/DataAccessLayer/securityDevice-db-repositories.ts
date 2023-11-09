import { jwtService } from './../Bisnes-logic-layer/jwtService';
import { ObjectId } from "mongodb";
import {
  DeviceModel,
  DeviceViewModel,
} from "./../UIRepresentation/types/deviceAuthSession";
import {
  deviceAuthSessionCollection,
  IPAuthSessionCollection,
} from "./../db/db";
// import { fromUnixTime } from "date-fns";
// import {format} from "date-fns-tz";


export const securityDeviceRepositories = {
  async getDevicesAllUsers(userId: string): Promise<DeviceViewModel[]> {
    const getAllDevices: DeviceModel[] = await deviceAuthSessionCollection
      .find({ userId })
      .toArray();

	//   const payload = await jwtService.decodeRefreshToken(refreshToken)
	//   const unixTime = fromUnixTime(payload.exp)
	//   const activeDate = format(new Date(unixTime), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', {timeZone: 'UTC'})

    return getAllDevices.map(function (item) {
      return {
        ip: item.ip,
        title: item.title,
        lastActiveDate: item.lastActiveDate,
        deviceId: item.deviceId,
      };
    });
  },
  async terminateSession(deviceId: string) {
    const deleteOne = await deviceAuthSessionCollection.deleteOne({deviceId});
    return deleteOne.deletedCount === 1;
  },
  async createDevice(device: DeviceModel): Promise<DeviceModel> {
    const resultDevice = await deviceAuthSessionCollection.insertOne(
      device,
    );	
    return device;
  },
  async findDeviceByDeviceId(deviceId: string) {
	console.log('deviceId find', deviceId)
    return await deviceAuthSessionCollection.findOne({ deviceId: deviceId });
  },
  async createCollectionIP(reqData: any) {
    await IPAuthSessionCollection.insertOne({ ...reqData });
    return reqData;
  },
  async countDocs(filter: any): Promise<number> {
    return await IPAuthSessionCollection.countDocuments({ filter });
  },
  async updateDeviceUser(userId: string) {
	const NewlastActiveDate = new Date().toISOString();
	await IPAuthSessionCollection.updateOne({userId: userId}, {$set: {lastActiveDate: NewlastActiveDate}})
  }
};
