import { Asset } from "expo-asset";
import { useMemo } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const customerHtml = require("../jims-acai-customer.html");

export default function CustomerAppScreen() {
  const htmlUri = useMemo(() => Asset.fromModule(customerHtml).uri, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: htmlUri }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        allowsInlineMediaPlayback
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d0845",
  },
  webview: {
    flex: 1,
    backgroundColor: "#2d0845",
  },
});
