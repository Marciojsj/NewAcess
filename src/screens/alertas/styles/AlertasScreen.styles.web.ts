// src/screens/alertas/styles/AlertasScreen.styles.web.ts
import { StyleSheet } from "react-native";
import { responsive } from "../../../utils/responsive";

const webSpecificStyles = {
  container: { minHeight: "100vh" as any },
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
    ...webSpecificStyles.container,
  },
  content: {
    padding: responsive.padding.xl,
    alignItems: "center",
    maxWidth: 800,
    width: "100%",
  },
  title: {
    fontSize: responsive.fontSize.xxl,
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
    paddingHorizontal: responsive.padding.xl,
    paddingVertical: responsive.padding.md,
    borderRadius: 12,
    cursor: "pointer" as any,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: responsive.fontSize.md,
    fontWeight: "600" as any,
  },
});
