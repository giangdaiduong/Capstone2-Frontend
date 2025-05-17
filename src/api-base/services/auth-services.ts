import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum AuthServiceIds {
  Login = 'auth.login',
  Register = 'auth.register',
}

export default [
  {
    id: AuthServiceIds.Login,
    url: 'v1/api/client/Auth',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: AuthServiceIds.Register,
    url: 'v1/api/client/User',
    method: MethodAPI.post,
    version: 1,
  },
] as ServiceApi[];
