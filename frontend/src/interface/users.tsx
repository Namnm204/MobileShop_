export interface Users {
  _id?: string;
  username: string;
  email: string;
  password: string;
  gender?: string;
  role: "user" | "admin";
  avatar?: string;
  address?: string;
  phoneNumber?: number;
  isLocked?: boolean;
}
