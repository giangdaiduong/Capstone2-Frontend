import { redirect } from 'next/navigation';
import { DriverBuilder } from '@alvin0/http-driver';
import { signOut } from 'next-auth/react';

import driveConfig, { services } from './driver';
import serverDriveConfig, { serverServices } from './server-driver';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

export const httpServerApi = async () => {
  const session = await getServerSession(authOptions);

  const token = session?.accessToken;

  return new DriverBuilder()
    .withBaseURL(serverDriveConfig.baseURL)
    .withAddRequestTransformAxios(request => {
      if (!request.headers) {
        request.headers = {};
      }
      request.headers['Authorization'] = `Bearer ${token}`;
    })
    .withServices(serverServices)
    .withAddResponseTransformAxios(res => {
      if (res.status === 401) {
        redirect('/logout');
      }
      if (res.status === 403) {
        redirect('/logout');
      }
    })
    .build();
};
