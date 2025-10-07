// src/screens/alertas/styles/AlertasScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./AlertasScreen.styles.web").default,
  default: require("./AlertasScreen.styles.native").default,
});

export default styles;
