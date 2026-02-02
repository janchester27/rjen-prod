import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'cashier-rjen',
  webDir: 'dist/cashier_rjen/browser',
  server: {
    cleartext: true
  }
};

export default config;
