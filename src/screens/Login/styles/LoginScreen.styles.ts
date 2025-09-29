// src/screens/Login/styles/LoginScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./LoginScreen.styles.web").default,
  default: require("./LoginScreen.styles.native").default,
});

export default styles;