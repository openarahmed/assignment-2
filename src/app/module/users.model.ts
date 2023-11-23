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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const address = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const order = new Schema<Order>({
  productName: String,
  price: Number,
  quantity: Number,
});
const usersSchema = new Schema<Users, UserModelStatic>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: fullName,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String, String],
  address: address,
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
