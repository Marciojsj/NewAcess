// src/screens/registrarEntrada/styles/RegistrarEntradaScreen.styles.native.ts
import { StyleSheet } from "react-native";
import { responsive } from "../../../utils/responsive";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: responsive.padding.lg,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: responsive.fontSize.xl,
    fontWeight: "700" as any,
    color: "#ffffff",
    marginBottom: responsive.spacing.md,
    textAlign: "center" as any,
  },
  subtitle: {
    fontSize: responsive.fontSize.md,
    color: "rgba(255,255,255,0.7)",
    marginBottom: responsive.spacing.xl,
    textAlign: "center" as any,
  },
  backButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderRadius: 12,
    elevation: 3,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: responsive.fontSize.md,
    fontWeight: "600" as any,
  },
});
