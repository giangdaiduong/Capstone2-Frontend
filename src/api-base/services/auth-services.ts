import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts';

export enum AuthServiceIds {
  Login = 'auth.login',
  Register = 'auth.register',
  VerifyOtp = 'auth.verify-otp',
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
    url: 'v1/api/client/Users',
    method: MethodAPI.post,
    version: 1,
  },
  {
    id: AuthServiceIds.VerifyOtp,
    url: '/v1/api/client/Users/verify-otp',
    method: MethodAPI.post,
    version: 1,
  },
] as ServiceApi[];
