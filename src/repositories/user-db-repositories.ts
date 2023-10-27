import { log } from "console";
import { PaginationType } from "../routers/types/types";
import { DBUserType, UserType } from "../routers/types/usersType";
import { userCollection } from "./../db/db";
import { Filter, ObjectId } from "mongodb";

export const userRepositories = {
  async findByLoginOrEmail(loginOrEmail: string): Promise<DBUserType | null> {
    const user: DBUserType | null = await userCollection.findOne({
      $or: [{ 'accountData.email': loginOrEmail }, { 'accountData.userName': loginOrEmail }],
    });
    return user;
  },
  async findUserByConfirmation(code: string): Promise<DBUserType | null> {
    const user: DBUserType | null = await userCollection.findOne({ 'emailConfirmation.confirmationCode': code });
    return user;
  },
  async updateConfirmation(_id: ObjectId) {
	const result = await userCollection.updateOne({_id}, {$set: {'emailConfirmation.isConfirmad': true}})
	return result.modifiedCount === 1
  },
  async updateUserConfirmation(_id: ObjectId, confirmationCode: string, newExpirationDate: Date): Promise<boolean> {
	const result = await userCollection.updateOne({_id}, {$set: {'emailConfirmation.confirmationCode': confirmationCode, 'emailConfirmation.expirationDate': newExpirationDate}})
	return result.modifiedCount === 1
  },
  async getAllUsers(
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string,
    searchLoginTerm: string,
    searchEmailTerm: string 
  ): Promise<PaginationType<UserType>> {
    const filter: Filter<DBUserType> = {$or: [{login: {$regex: searchLoginTerm, $options: 'i'}}, {email: {$regex: searchEmailTerm, $options: 'i'}}]};
	
    const getAllUsers = await userCollection
      .find(filter, { projection: { passwordHash: 0 } })
      .sort({ [sortBy]: sortDirection === "asc" ? 1 : -1 })
      .skip((+pageNumber - 1) * +pageSize)
      .limit(+pageSize)
      .toArray();

    const totalCount: number = await userCollection.countDocuments(filter);
    const pagesCount: number = await Math.ceil(totalCount / +pageSize);

	return {
        pagesCount: pagesCount,
        page: +pageNumber,
        pageSize: +pageSize,
        totalCount: totalCount,
        items: getAllUsers.map(user => ({
			id: user._id.toString(),
			login: user.accountData.userName,
			email: user.accountData.email,
			createdAt: user.accountData.createdAt,
		})),
      }
  },
  async createUser(newUser: DBUserType): Promise<DBUserType> {
	const  updateUser = await userCollection.insertOne(newUser)
	return newUser
  },
  async deleteById(id: string): Promise<boolean> {
	const deleted = await userCollection.deleteOne({_id: new ObjectId(id)})
	return deleted.deletedCount === 1;
  },
  async findUserById(userId: ObjectId | null) {
    let user = await userCollection.findOne({ _id: userId });
    if (user) {
      return user;
    } else {
      return null;
    }
  },
  async deleteAll() {
	const deleteAllUsers = await userCollection.deleteMany({})
	return deleteAllUsers.deletedCount === 1;
  },
  
};
