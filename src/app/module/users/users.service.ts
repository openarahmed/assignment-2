import { usersModel } from '../users.model';
import { Users } from './users.interface';

const createusersToDB = async (user: Users) => {
  if (await usersModel.isUserExists(user.userId)) {
    throw new Error('User already exists!');
  }
  const result = usersModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await usersModel.find(
    {},
    ' username fullName age email address',
  );
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const userExists = await usersModel.isUserExists(Number(userId));

  if (!userExists) {
    throw new Error('User not found');
  }

  const result = await usersModel
    .findOne(
      { userId },
      'userId username fullName age email isActive hobbies address',
    )
    .select('-password');
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  const userExists = await usersModel.isUserExists(Number(userId));

  if (!userExists) {
    throw new Error('User not found');
  }

  const result = await usersModel.deleteOne({ userId });
  return result;
};

const updateUserInDB = async (userId: string, updatedUser: Users) => {
  const userExists = await usersModel.isUserExists(Number(userId));

  if (!userExists) {
    throw new Error('User not found');
  }

  const result = await usersModel.updateOne({ userId }, { $set: updatedUser });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const orderInDB = async (userId: string, orderData: any) => {
  try {
    const user = await usersModel.findOne({ userId });

    const userExists = await usersModel.isUserExists(Number(userId));

    if (!userExists) {
      throw new Error('User not found');
    }

    if (!Array.isArray(user.order)) {
      user.order = [];
    }
    user.order.push(orderData);
    await user.save();
    return {
      success: true,
      message: 'Order added successfully!',
      data: null,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Internal server error',
    };
  }
};

const getOrdersFromDB = async (userId: string) => {
  const userExists = await usersModel.isUserExists(Number(userId));

  if (!userExists) {
    throw new Error('User not found');
  }

  const user = await usersModel.findOne({ userId }).select('-password');
  const userOrders = user?.order || [];
  return userOrders;
};
const getTotalPriceFromDB = async (userId: string) => {
  const userExists = await usersModel.isUserExists(Number(userId));

  if (!userExists) {
    throw new Error('User not found');
  }

  const aggregateResult = await usersModel.aggregate([
    { $match: { userId: parseInt(userId) } },
    { $unwind: '$order' },
    {
      $group: {
        _id: '$userId',
        totalOrderPrice: { $sum: '$order.price' },
        orders: { $push: '$order' },
      },
    },
  ]);

  if (aggregateResult.length === 0) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const { totalOrderPrice, orders } = aggregateResult[0];

  return { totalOrderPrice };
};

export const userServices = {
  createusersToDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInDB,
  orderInDB,
  getOrdersFromDB,
  getTotalPriceFromDB,
};
