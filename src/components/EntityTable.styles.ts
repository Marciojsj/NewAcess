import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./EntityTable.styles.web").default,
  default: require("./EntityTable.styles.native").default,
});

export default styles;