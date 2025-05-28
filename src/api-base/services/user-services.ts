import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum UserServiceIds {
  GetUserProfile = 'user.getUserProfile',
  UpdateUserProfile = 'user.updateUserProfile',
}

export default [
  {
    id: UserServiceIds.GetUserProfile,
    url: 'v1/api/client/Users/get-by-id',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: UserServiceIds.UpdateUserProfile,
    url: 'v1/api/client/Users/{id}',
    method: MethodAPI.patch,
    version: 1,
  },
] as ServiceApi[];
