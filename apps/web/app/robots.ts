import { constructUrl } from '@repo/next-config/utils';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: constructUrl('/sitemap.xml').href,
  };
}
