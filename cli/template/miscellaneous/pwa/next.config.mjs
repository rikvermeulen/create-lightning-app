/** @type {import('next').NextConfig} */

import { resolve } from 'path';
import { config as dotenvConfig } from 'dotenv-safe';
import pwa from '@ducanh2912/next-pwa';

const { parsed: localEnv } = dotenvConfig({
  allowEmptyValues: true,
  path: resolve(process.cwd(), `src/config/.env.${process.env.NODE_ENV}`),
});

const withPWA = pwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  env: localEnv,
  experimental: {
    appDir: true,
  },
};

export default withPWA(nextConfig);
