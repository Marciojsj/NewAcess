// src/screens/registrarEntrada/styles/RegistrarEntradaScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./RegistrarEntradaScreen.styles.web").default,
  default: require("./RegistrarEntradaScreen.styles.native").default,
});

export default styles;
