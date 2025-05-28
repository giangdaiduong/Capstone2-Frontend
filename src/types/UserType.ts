import { BaseEntity } from './common';

export type UserType = BaseEntity & {
  username: string;
  email: string;
  roleName: string;
  phone: string;
  fullName: string;
  address: string;
  avatar: string;
  cccd: string;
  roleId: string;
  cccdFront: string;
  cccdBack: string;
  createdOn: string;
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  expiresIn?: number;
  birthday: string;
  preferredIndustries?: string;
  preferredStages?: string;
  preferredRegions?: string;
  fundingRangeMin?: string;
  fundingRangeMax?: string;
};
