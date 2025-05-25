import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum UserServiceIds {
  GetAllUsers = 'user.getAllUsers',
  DeleteUser = 'user.deleteUser',
  GetUserById = 'user.getUserById',
  GetUserProfileById = 'user.getUserProfileById',
}

export default [
  {
    id: UserServiceIds.GetAllUsers,
    url: 'v1/api/client/Users',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: UserServiceIds.DeleteUser,
    url: 'v1/api/client/Users/{id}',
    method: MethodAPI.delete,
    version: 1,
  },
  {
    id: UserServiceIds.GetUserById,
    url: 'v1/api/client/Users/{id}',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: UserServiceIds.GetUserProfileById,
    url: 'v1/api/client/Users/profile/{id}',
    method: MethodAPI.get,
    version: 1,
  },
] as ServiceApi[];
