import express from 'express';
import { UsersController } from './users.controller';

const router = express.Router();

router.post('/users', UsersController.createUsers);
router.get('/users', UsersController.getAllUsers);
router.get('/users/:userId', UsersController.getSingleUser);
router.delete('/users/:userId', UsersController.deleteAUser);
router.put('/users/:userId', UsersController.updateAUser);

export const UsersRoute = router;
