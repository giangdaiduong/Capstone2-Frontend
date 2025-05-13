import type { ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts'
import { MethodAPI } from '@alvin0/http-driver/dist/utils/driver-contracts'

export enum AuthServiceIds {
  Login = 'auth.login',
  Register = 'auth.register'
}

export default [
  {
    id: AuthServiceIds.Login,
    url: 'login',
    method: MethodAPI.post,
    version: 1
  },
  {
    id: AuthServiceIds.Register,
    url: 'register',
    method: MethodAPI.post,
    version: 1
  }
] as ServiceApi[]
