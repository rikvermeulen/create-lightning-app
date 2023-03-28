/** @type {import('next').NextConfig} */

import { resolve } from 'path';
import { config as dotenvConfig } from 'dotenv-safe';
import withPWA from '@ducanh2912/next-pwa';

const { parsed: localEnv } = dotenvConfig({
  allowEmptyValues: true,
  path: resolve(process.cwd(), `src/config/.env.${process.env.NODE_ENV}`),
});

const pwaOptions = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

const nextConfig = {
  env: localEnv,
  experimental: {
    appDir: true,
  },
};

export default withPWA(nextConfig, pwaOptions);
