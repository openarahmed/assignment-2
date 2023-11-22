import {} from 'mongoose';

export type FUllName = {
  firstName: string;
  lastName: string;
};
export type Address = {
  street: string;
  city: string;
  country: string;
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
};
