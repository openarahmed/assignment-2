import { usersModel } from '../users.model';
import { Users } from './users.interface';

const createusersToDB = async (user: Users) => {
  const result = usersModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await usersModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await usersModel.findOne({ userId });
  return result;
};

export const userServices = {
  createusersToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
