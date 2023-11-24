/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/push-notifications" />
/// <reference types="@capacitor/splash-screen" />

import { CapacitorConfig } from "@capacitor/cli";

export default {
  appId: "com.deskbtm.publish",
  appName: "publish",
  webDir: "dist",
  server: {
    url: "http://192.168.0.107:3000/",
    androidScheme: "https",
  },
} satisfies CapacitorConfig;
