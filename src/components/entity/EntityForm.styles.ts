import { Platform } from "react-native";

const styles = Platform.select({
  web: require("./EntityForm.styles.web").default,
  default: require("./EntityForm.styles.native").default,
});

export default styles;