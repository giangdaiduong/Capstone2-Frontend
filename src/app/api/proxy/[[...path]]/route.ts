import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import 'server-only';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';

const BACKEND_BASE_URL = process.env.BACK_END_API_URL || 'https://localhost:44314/api';

/**
 * Function to proxy requests to the backend.
 * @param request - The NextRequest object from Next.js.
 * @param path - The array of path parts to be proxied.
 * @returns The NextResponse from the backend or an appropriate error.
 */
async function handleProxy(request: NextRequest, path: string[]) {
  try {
    // Get session from next-auth
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;
    const headers = new Headers(request.headers);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      headers.delete('Content-Length');
    }

    const backendPath = path.join('/');
    const backendURL = new URL(`${BACKEND_BASE_URL}/${backendPath}${request.nextUrl.search}`).toString();

    let body: BodyInit | undefined = undefined;

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      body = await request.arrayBuffer();
    } // Proxy request to the backend

    const backendResponse = await fetch(backendURL, {
      method: request.method,
      headers: headers,
      body: body,
      redirect: 'manual',
      credentials: 'include',
    });

    const responseHeaders = new Headers(backendResponse.headers);

    responseHeaders.delete('content-encoding');

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';

    return NextResponse.json({ message }, { status: 500 });
  }
}

async function handleRequest(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params;
  const path = params.path || [];

  return handleProxy(request, path);
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const DELETE = handleRequest;
export const PATCH = handleRequest;
export const OPTIONS = handleRequest;
