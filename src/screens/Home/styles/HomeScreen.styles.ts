// src/screens/Home/styles/HomeScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./HomeScreen.styles.web").default,
  default: require("./HomeScreen.styles.native").default,
});

export default styles;