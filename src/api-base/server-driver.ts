import type { DriverInformation, ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';
import { services } from './driver';

const baseURL: string = process.env.BACK_END_API_URL ?? 'http://localhost:5182';

export const serverServices: ServiceApi[] = [...services];

const serverDriveConfig: DriverInformation = {
  baseURL: baseURL,
  services: serverServices,
};

export default serverDriveConfig;
