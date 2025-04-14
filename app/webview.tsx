import { Platform, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const htmlUrl = Platform.select({
  ios: "html/index.html",
  android: "file:///android_asset/html/index.html",
  default: "",
});

export default function LocalHtmlViewer() {
  return (
    <View style={{ flex: 1 }}>
      <Text>URL: {htmlUrl}</Text>
      <WebView
        source={{ uri: htmlUrl }}
        originWhitelist={["*"]}
        webviewDebuggingEnabled
      />
    </View>
  );
}
