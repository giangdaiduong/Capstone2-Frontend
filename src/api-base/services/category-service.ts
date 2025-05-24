import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum CategoryServiceIds {
  GetAllCategories = 'category.getAllCategories',
}

export default [
  {
    id: CategoryServiceIds.GetAllCategories,
    url: 'v1/api/admin/Categories',
    method: MethodAPI.get,
    version: 1,
  },
] as ServiceApi[];
