# React Native Webview Local HTML Example

This is a simple example of using React Native WebView to load local HTML files, including local JavaScript and CSS files.

## Features

- Works on both iOS and Android platforms
- Supports loading local JavaScript and CSS files
- Uses [Continuous Native Generation (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/) for easy management of different platforms

### Key Points

The main implementation involves:

- **Asset Copying**: The `app.config.ts` uses the `plugin/with-assets.js` plugin to copy HTML files to:
  - Android: `android/app/src/main/assets/` directory
  - iOS: `Assets/` directory
  - This is done by adding the following to `app.config.ts`:
  ```ts
  const config = {
    plugins: [
      [
        require("./plugins/with-assets.js"),
        { assetsPath: resolve(__dirname, "html") },
      ],
    ],
  };
  ```
- **Platform-Specific URIs**:
  - Android: `file:///android_asset/html/index.html`
  - iOS: `html/index.html`

```tsx
import { Platform } from "react-native";
import { WebView } from "react-native-webview";

const htmlUrl = Platform.select({
  ios: "html/index.html",
  android: "file:///android_asset/html/index.html",
  default: "",
});

export default function LocalHtmlViewer() {
  return <WebView source={{ uri: htmlUrl }} originWhitelist={["*"]} />;
}
```

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   pnpm ios
   pnpm android
   ```

## Troubleshooting

- If HTML content doesn't appear, try running `pnpx expo prebuild --clean` to clean the build cache.
