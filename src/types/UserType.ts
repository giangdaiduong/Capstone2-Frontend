import { BaseEntity } from './common';

export type UserType = BaseEntity & {
  username: string;
  email: string;
  token?: string;
  refreshTokenExpiryTime: string;
  fullName: string;
  passwordHash: string;
  roleId: string;
  birthday: string;
  phone: string;
  avatar: string;
  address: string;
  cccd: string;
  cccdFront: string;
  cccdBack: string;
  preferredIndustries?: string;
  preferredStages?: string;
  preferredRegions?: string;
  fundingRangeMin?: number;
  fundingRangeMax?: number;
};
