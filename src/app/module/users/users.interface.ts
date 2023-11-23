import { Model } from 'mongoose';

export type FUllName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  street: string;
  city: string;
  country: string;
};

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};
export type Users = {
  userId: number;
  username: string;
  password: string;
  fullName: FUllName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string | string;
  address: Address;
  order: Order;
};

export interface UserModelStatic extends Model<Users> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<Users | null>;
}
