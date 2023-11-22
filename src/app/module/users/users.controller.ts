import { Request, Response } from 'express';
import { userServices } from './users.service';

const createUsers = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    const result = await userServices.createusersToDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err) {
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
  } catch (err) {
    console.log(err);
  }
};
const deleteAUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    userServices.deleteUserFromDB(userId);
    console.log(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateAUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = req.body.user;
    // Assuming the entire updated user data is sent in the request body

    const result = await userServices.updateUserInDB(userId, user);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Failed to update user',
      data: null,
    });
  }
};

export const UsersController = {
  createUsers,
  getAllUsers,
  getSingleUser,
  deleteAUser,
  updateAUser,
};
