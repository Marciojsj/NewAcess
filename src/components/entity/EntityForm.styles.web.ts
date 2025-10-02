import { StyleSheet } from "react-native";
import { responsive } from "../../utils/responsive";

const webSpecificStyles = {
  container: { minHeight: "100vh" as any },
  input: { outlineStyle: "none" as any },
  button: { cursor: "pointer" as any, transition: "all 0.2s ease" as any },
  buttonDisabled: { cursor: "not-allowed" as any },
};

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
    ...webSpecificStyles.container,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 52,
    ...webSpecificStyles.input,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...webSpecificStyles.button,
  },
  cancelButton: {},
  submitButton: {},
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});