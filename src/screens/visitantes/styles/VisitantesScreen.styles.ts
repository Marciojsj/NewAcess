// src/screens/visitantes/styles/VisitantesScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./VisitantesScreen.styles.web").default,
  default: require("./VisitantesScreen.styles.native").default,
});

export default styles;
