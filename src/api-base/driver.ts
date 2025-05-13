import type { DriverInformation, ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';

import authService from './services/auth-services';

const baseURL: string = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

export const services: ServiceApi[] = [...authService];

const driveConfig: DriverInformation = {
  baseURL: baseURL,
  services: services,
};

export default driveConfig;
