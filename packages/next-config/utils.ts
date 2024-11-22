import { env } from '@repo/env';

export function getBaseUrl() {
  const baseUrl = env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

  if (baseUrl.includes('localhost')) {
    return `http://${baseUrl}`;
  }

  return `https://${baseUrl}`;
}

export function constructUrl(
  url: string | URL,
  baseUrl: string | URL = getBaseUrl()
): URL {
  return new URL(url, baseUrl);
}
