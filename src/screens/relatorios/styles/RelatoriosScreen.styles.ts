// src/screens/relatorios/styles/RelatoriosScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./RelatoriosScreen.styles.web").default,
  default: require("./RelatoriosScreen.styles.native").default,
});

export default styles;
