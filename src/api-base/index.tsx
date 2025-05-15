import { redirect } from 'next/navigation';
import { DriverBuilder } from '@alvin0/http-driver';
import { signOut } from 'next-auth/react';

import driveConfig, { services } from './driver';
import serverDriveConfig, { serverServices } from './server-driver';

export const httpPageApi = new DriverBuilder()
  .withBaseURL(driveConfig.baseURL)
  .withServices(services)
  .withAddResponseTransformAxios(res => {
    if (res.status === 401) {
      signOut({
        redirect: true,
        callbackUrl: '/login',
      });
    }
  })
  .build();

export const httpServerApi = new DriverBuilder()
  .withBaseURL(serverDriveConfig.baseURL)
  .withServices(serverServices)
  .withAddResponseTransformAxios(res => {
    if (res.status === 401) {
      redirect('/logout');
    }
  })
  .build();
