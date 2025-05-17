import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum RoleServiceIds {
  GetAllRoles = 'role.getAllRoles',
  GetPublicRoles = 'role.getPublicRoles',
}

export default [
  {
    id: RoleServiceIds.GetAllRoles,
    url: 'v1/api/admin/Roles',
    method: MethodAPI.get,
    version: 1,
  },
  {
    id: RoleServiceIds.GetPublicRoles,
    url: 'v1/api/admin/Roles/public',
    method: MethodAPI.get,
    version: 1,
  },
] as ServiceApi[];
