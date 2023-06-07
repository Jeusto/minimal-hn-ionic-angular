import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jeusto.minimalhn',
  appName: 'Minimal HN',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
