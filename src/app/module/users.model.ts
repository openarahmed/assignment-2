import { Schema, model } from 'mongoose';
import { Address, FUllName, Users } from './users/users.interface';

const fullName = new Schema<FUllName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const address = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const usersSchema = new Schema<Users>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: fullName,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [String, String],
  address: address,
});

export const usersModel = model<Users>('users', usersSchema);
