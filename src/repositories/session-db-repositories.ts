import { BlackList } from './../routers/types/sessionTypes';
import { ObjectId } from "mongodb";
import { sessionCollection } from "./../db/db";

export const sessionRepositories = {
  async findRefreshToken(refreshToken: string) {
    const result = await sessionCollection.findOne({
		refreshToken: refreshToken,
    });
    return result;
  },
  async addRefreshToken(currentUserId: ObjectId, newRefreshToken: string) {
    const result = await sessionCollection.updateOne(
      { _id: currentUserId },
      { $push: { sessionToken: newRefreshToken } }
    );
  },
  async addToBlackList(newRefreshToken: BlackList): Promise<boolean> {
	const result = await sessionCollection.insertOne({...newRefreshToken})
	if(result) {
		return true
	} else {
		return false
	}
  }
};
