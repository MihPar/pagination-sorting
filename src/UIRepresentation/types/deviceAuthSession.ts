import { ObjectId } from "mongodb"

export type CollectionIP = {
	IP: string
	URL: string
	date: Date
}

// const apiAccessSchema = new mongoose.Schema({
// 	IP: {
// 	type: String,
// 	required: true
// 	},
// 	URL: {
// 	type: String,
// 	required: true
// 	},
// 	date: {
// 	type: Date,
// 	required: true
// 	}
// 	});

export type DeviceModel =  {
    ip: string
    title: string
    deviceId: ObjectId
    userId: string
	lastActiveDate: string
}

export type DeviceViewModel =  {
    ip: string
    title: string
    deviceId: ObjectId
	lastActiveDate: string
}

