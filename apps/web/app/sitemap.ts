// biome-ignore lint/correctness/noNodejsModules: Generates sitemap on Node.js
import fs from 'node:fs';
import { constructUrl, getBaseUrl } from '@repo/next-config/utils';
import type { MetadataRoute } from 'next';

const appFolders = fs.readdirSync('app', { withFileTypes: true });
const pages = appFolders
  .filter((file) => file.isDirectory())
  .filter((folder) => !folder.name.startsWith('_'))
  .filter((folder) => !folder.name.startsWith('('))
  .map((folder) => folder.name);

const blogs = fs
  .readdirSync('content/blog', { withFileTypes: true })
  .filter((file) => !file.isDirectory())
  .filter((file) => !file.name.startsWith('_'))
  .filter((file) => !file.name.startsWith('('))
  .map((file) => file.name.replace('.mdx', ''));

const legals = fs
  .readdirSync('content/legal', { withFileTypes: true })
  .filter((file) => !file.isDirectory())
  .filter((file) => !file.name.startsWith('_'))
  .filter((file) => !file.name.startsWith('('))
  .map((file) => file.name.replace('.mdx', ''));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getBaseUrl(),
      lastModified: new Date(),
    },
    ...pages.map((page) => ({
      url: constructUrl(page).href,
      lastModified: new Date(),
    })),
    ...blogs.map((blog) => ({
      url: constructUrl(`blog/${blog}`).href,
      lastModified: new Date(),
    })),
    ...legals.map((legal) => ({
      url: constructUrl(`legal/${legal}`).href,
      lastModified: new Date(),
    })),
  ];
}
