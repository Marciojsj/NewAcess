import { Platform } from "react-native";

const styles = Platform.select({
  web: () => require("./RegistroEntidadeScreen.styles.web").default,
  default: () => require("./RegistroEntidadeScreen.styles.native").default,
})();

export default styles;