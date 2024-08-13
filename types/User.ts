export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  userImage: string;
  verified: boolean;
  secretKey: string;
  history: string[];
  userRole: number;
  createdAt: string;
  updatedAt: string;
}
