import type { DriverInformation, ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';

import authService from './services/auth-services';
import roleService from './services/role-services';
import ideaService from './services/idea-services';

const baseURL: string = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api') + '/proxy';

export const services: ServiceApi[] = [...authService, ...roleService, ...ideaService];

const driveConfig: DriverInformation = {
  baseURL: baseURL,
  services: services,
};

export default driveConfig;
