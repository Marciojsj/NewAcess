import { StyleSheet } from "react-native";

// Estilos específicos para web
const webSpecificStyles = {
  container: { 
    minHeight: "100vh" as any,
    padding: 24,
  },
};

export default StyleSheet.create({
  container: {
    flex: 1,
    ...webSpecificStyles.container,
  },
});