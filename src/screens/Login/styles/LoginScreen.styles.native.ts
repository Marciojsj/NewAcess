import { StyleSheet, Dimensions } from "react-native";
import { responsive } from "../../../utils/responsive";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.xl,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 20,
    marginHorizontal: responsive.padding.md,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: responsive.spacing.xl * 2,
  },
  title: {
    fontSize: responsive.fontSize.xxl,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: responsive.spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontSize: responsive.fontSize.md,
    color: "#888",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  loginButton: {
    height: 56,
    backgroundColor: "#8a2be2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsive.spacing.sm,
    shadowColor: "#8a2be2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonLoading: {
    backgroundColor: "#666",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: responsive.fontSize.lg,
    fontWeight: "600",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: responsive.spacing.lg,
  },
  linkButton: {
    paddingVertical: responsive.spacing.xs,
    paddingHorizontal: responsive.spacing.xs,
  },
  linkText: {
    color: "#888",
    fontSize: responsive.fontSize.sm,
    textDecorationLine: "underline",
  },
});
