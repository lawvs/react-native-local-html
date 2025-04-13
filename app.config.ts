import type { ConfigContext, ExpoConfig } from "expo/config";
import { resolve } from "node:path";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "react-native-local-html",
  slug: "react-native-local-html",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    bundleIdentifier: "example.react-native-local-html",
    supportsTablet: true,
  },
  android: {
    package: "example.react_native_local_html",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    [
      require("./plugins/with-assets.js"),
      {
        // Add asset directory paths, the plugin copies the files in the given paths to the app bundle folder named Assets
        assetsPath: resolve(__dirname, "html"),
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
