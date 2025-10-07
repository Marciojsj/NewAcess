// src/screens/registrarSaida/styles/RegistrarSaidaScreen.styles.ts
import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./RegistrarSaidaScreen.styles.web").default,
  default: require("./RegistrarSaidaScreen.styles.native").default,
});

export default styles;
