type DeviceMetaDate = {
	IP: string
	URL: string
	date: Date
}

export type CurrentUser = Array<DeviceMetaDate> 

// export type CurrentUser = {
// 	title: string
// 	lastActiveDate: string
// 	deviceId: string
// } & DeviceAuthSession