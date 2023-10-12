import { DBUserType, PaginationType, UserType } from "./../types";
import { userCollection } from "./../db/db";
import { Filter, ObjectId } from "mongodb";

export const userRepositories = {
  async findByLoginOrEmail(loginOrEmail: string) {
    const user = await userCollection.findOne({
      $or: [{ email: loginOrEmail }, { userName: loginOrEmail }],
    });
    return user;
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
      .sort({ [sortBy]: sortDirection === "asc" ? -1 : 1 })
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
			id: user._id,
			login: user.login,
			email: user.email,
			createdAt: user.createdAt,
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
  }
};
