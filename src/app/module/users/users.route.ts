import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.post('/users', UsersController.createUsers);
router.get('/users', UsersController.getAllUsers);
router.get('/users/:userId', UsersController.getSingleUser);
router.delete('/users/:userId', UsersController.deleteAUser);
router.put('/users/:userId', UsersController.updateAUser);
router.put('/users/:userId/orders', UsersController.createOrderAUser);
router.get('/users/:userId/orders', UsersController.getUserOrders);
router.get(
  '/users/:userId/orders/total-price',
  UsersController.userOrderTotalPrice,
);

export const UsersRoute = router;
