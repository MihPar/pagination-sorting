import { ObjectId } from "mongodb"

export type CollectionIP = {
	IP: string
	URL: string
	createAt: Date
	// method: string
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
	issuedAt: string
}

export type DeviceViewModel =  {
    ip: string
    title: string
    deviceId: ObjectId
	lastActiveDate: string
}

