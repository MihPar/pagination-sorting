import { ObjectId } from "mongodb"

export type CommentTypeView = {
	id: string
	content: string
	commentatorInfo: {
		userId: string
		userLogin: string
	},
	createdAt: string
}

export type CommentType = {
	_id: ObjectId
	content: string
	commentatorInfo: {
		userId: string
		userLogin: string
	},
	postId: string
	createdAt: string
}

