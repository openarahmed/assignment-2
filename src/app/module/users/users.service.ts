import { usersModel } from '../users.model';
import { Users } from './users.interface';

const createusersToDB = async (user: Users) => {
  const result = usersModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await usersModel.find(
    {},
    'username fullName age email address',
  );
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await usersModel.findOne({ userId });
  return result;
};
const deleteUserFromDB = async (userId: string) => {
  const result = await usersModel.deleteOne({ userId });
  return result;
};

export const userServices = {
  createusersToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
};
