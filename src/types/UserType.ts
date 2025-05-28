import { BaseEntity } from './common';

export type UserType = BaseEntity & {
  id: string;
  username: string;
  email: string;
  roleName: string;
  phone: string;
  fullName: string;
  address: string;
  avatar: string;
  cccd: string;
  birthday: Date;
  roleId: string;
  cccdFront: string;
  cccdBack: string;
  createdOn: string;
  accessToken?: string;
  refreshToken?: string;
};
