import { Schema, model } from 'mongoose';
import {
  Address,
  FUllName,
  Order,
  UserModelStatic,
  Users,
} from './users/users.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const fullName = new Schema<FUllName>({
  firstName: { type: String, required: [true, 'FirstName is must Required'] },
  lastName: { type: String, required: [true, 'LastName is must Required'] },
});
const address = new Schema<Address>({
  street: { type: String, required: [true, 'street is required'] },
  city: { type: String, required: [true, 'city is required'] },
  country: { type: String, required: [true, 'country is required'] },
});
const order = new Schema<Order>({
  productName: String,
  price: Number,
  quantity: Number,
});
const usersSchema = new Schema<Users, UserModelStatic>({
  userId: {
    type: Number,
    required: [true, 'userId is required'],
    unique: true,
    maxlength: [12, 'Maximum 12 charecters'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: [true, 'Password must is required'] },
  fullName: {
    type: fullName,
    required: true,
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: {
    type: String,
    required: [true, 'email must is required'],
    unique: true,
  },
  isActive: { type: Boolean, required: [true, 'isActive or not is required'] },
  hobbies: [String, String],
  address: { type: address, required: true },
  order: [order],
});

usersSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

usersSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

usersSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await usersModel.findOne({ userId });
  return existingUser;
};

export const usersModel = model<Users, UserModelStatic>('users', usersSchema);
