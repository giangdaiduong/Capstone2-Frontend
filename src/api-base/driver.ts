import type { DriverInformation, ServiceApi } from '@alvin0/http-driver/dist/utils/driver-contracts';

import authService from './services/auth-services';
import roleService from './services/role-services';
import ideaService from './services/idea-services';
import commentService from './services/comment-services';
import categoryService from './services/category-service';
import userService from './services/user-services';

const baseURL: string = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api') + '/proxy';

export const services: ServiceApi[] = [
  ...authService,
  ...roleService,
  ...ideaService,
  ...commentService,
  ...categoryService,
  ...userService,
];

const driveConfig: DriverInformation = {
  baseURL: baseURL,
  services: services,
};

export default driveConfig;
