import { Request, Response } from 'express';
import { userServices } from './users.service';
import userJoiSchema from './user.validation';

const createUsers = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const { error, value } = userJoiSchema.validate(user);
    console.log(error, value);
    const result = await userServices.createusersToDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
    console.log(err);
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
    console.log(err);
  }
};
const deleteAUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await userServices.deleteUserFromDB(userId);
    console.log(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateAUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = req.body.user;

    const result = await userServices.updateUserInDB(userId, user);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
    console.log(err);
  }
};

const createOrderAUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;

    const result = await userServices.orderInDB(userId, orderData);

    res.status(200).json({
      success: true,
      message: 'Order added successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Error adding order',
      error: {
        code: 500,
        description: err.message || 'Internal server error',
      },
    });
    console.log(err);
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await userServices.getOrdersFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetches successfully',
      data: {
        orders,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
    console.log(err);
  }
};
const userOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const price = await userServices.getTotalPriceFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: price,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
    console.log(err);
  }
};

export const UsersController = {
  createUsers,
  getAllUsers,
  getSingleUser,
  deleteAUser,
  updateAUser,
  createOrderAUser,
  getUserOrders,
  userOrderTotalPrice,
};
