import { ObjectId } from "mongodb"

export type CollectionIP = {
	IP: string
	URL: string
	date: Date
}

export type Device =  {
    ip: string
    title: string
    deviceId: ObjectId
    userId: string
	lastActiveDate: string
}
