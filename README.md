# React Native Webview Local HTML Example

This is a simple example of using React Native WebView to load local HTML files in a React Native application. The project demonstrates how to create a basic app that displays a local HTML file using the WebView component.

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app

   ```bash
   pnpx expo start
   ```

### Key Points

The main implementation involves:

- **Asset Copying**: The `app.config.ts` uses the `plugin/with-assets.js` plugin to copy HTML files to:
  - Android: `android/app/src/main/assets/html/` directory
  - iOS: `Assets` directory
  - This is done by adding the following to `app.config.ts`:
  ```ts
   [
     require("./plugins/with-assets.js"),
     { assetsPath: resolve(__dirname, "html") },
   ],
  ```
- **Platform-Specific URIs**:
  - Android: `file:///android_asset/html/index.html`
  - iOS: `file://html/index.html`

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

## Troubleshooting

- If HTML content doesn't appear, try run `pnpx expo prebuild --clean` to clean the build cache.
