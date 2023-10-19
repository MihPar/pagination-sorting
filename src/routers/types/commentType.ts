import { ObjectId } from "mongodb"

export type CommentTypeView = {
	id: any
	content: string
	commentatorInfo: {
		userId: string
		userLogin: string
	},
	createdAt: string
}

export type CommentType = {
	id: ObjectId
	content: string
	commentatorInfo: {
		userId: string
		userLogin: string
	},
	postId: string
	createdAt: string
}

