import { StyleSheet, Dimensions } from "react-native";
import { responsive } from "../../../utils/responsive";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0a0a0a", // Será substituído por theme.loginBackground
	},
	themeTogglePosition: {
		position: "absolute" as const,
		top: 40,
		right: 20,
		zIndex: 1000,
	},
	backgroundContainer: {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	circle1: {
		position: "absolute",
		width: width * 0.8,
		height: width * 0.8,
		borderRadius: width * 0.4,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.12)", // Será theme.loginCircle1
		top: height * 0.1,
		left: width * 0.1,
	},
	circle2: {
		position: "absolute",
		width: width * 1.2,
		height: width * 1.2,
		borderRadius: width * 0.6,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.1)", // Será theme.loginCircle2
		top: height * 0.2,
		left: -width * 0.1,
	},
	circle3: {
		position: "absolute",
		width: width * 0.6,
		height: width * 0.6,
		borderRadius: width * 0.9,
		borderWidth: 1,
		borderColor: "rgba(124, 44, 199, 0.62)", // Será theme.loginCircle3
		top: height * 0.4,
		right: -width * 0.1,
	},
	formContainer: {
		top: height * 0.25,
		justifyContent: "center",
		paddingHorizontal: responsive.padding.lg,
		paddingVertical: responsive.padding.xl,
	},
	headerContainer: {
		alignItems: "center",
		marginBottom: responsive.spacing.xl * 2,
	},
	title: {
		fontSize: responsive.fontSize.xl * 1.7,
		fontWeight: "bold",
		color: "#ffffff", // Será theme.loginText
		marginBottom: responsive.spacing.sm,
		textAlign: "center",
	},
	subtitle: {
		fontSize: responsive.fontSize.md,
		color: "#888", // Será theme.loginTextSecondary
		textAlign: "center",
	},
	form: {
		width: "100%",
	},
	inputContainer: {
		marginBottom: responsive.spacing.lg,
	},
	inputLabel: {
		fontSize: responsive.fontSize.sm,
		color: "#ccc", // Será theme.loginTextSecondary
		marginBottom: responsive.spacing.xs,
		fontWeight: "500",
	},
	inputWrapper: {
		borderWidth: 1,
		borderColor: "#333", // Será theme.loginBorder
		borderRadius: 12,
		backgroundColor: "rgba(255, 255, 255, 0.05)", // Será theme.backgroundCard
	},
	inputWrapperFocused: {
		borderColor: "#8a2be2", // Será theme.loginButton
		backgroundColor: "rgba(138, 43, 226, 0.1)", // Será theme.loginCircle1
		shadowColor: "#8a2be2", // Será theme.loginButton
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
	},
	inputWrapperError: {
		borderColor: "#ff4757", // Será theme.loginError
		backgroundColor: "rgba(255, 71, 87, 0.1)", // Será theme.errorLight
	},
	input: {
		height: 56,
		paddingHorizontal: responsive.padding.md,
		fontSize: responsive.fontSize.md,
		color: "#ffffff", // Será theme.loginInputText
	},
	inputFocused: {
		color: "#ffffff", // Será theme.loginInputText
	},
	errorText: {
		color: "#ff4757", // Será theme.loginError
		fontSize: responsive.fontSize.sm,
		marginTop: responsive.spacing.xs,
		marginLeft: responsive.spacing.xs,
	},
	loginButton: {
		height: 56,
		backgroundColor: "#8a2be2", // Será theme.loginButton
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsive.spacing.sm,
		shadowColor: "#8a2be2", // Será theme.loginButton
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 12,
		elevation: 8,
	},
	loginButtonLoading: {
		backgroundColor: "#666", // Será theme.loginButtonBackgroundDisabled
	},
	loginButtonText: {
		color: "#ffffff", // Será theme.loginButtonText
		fontSize: responsive.fontSize.lg,
		fontWeight: "600",
	},
	loadingIcon: {
		width: 24,
		height: 24,
		borderWidth: 2,
		borderColor: "#ffffff", // Será theme.loginButtonText
		borderTopColor: "transparent",
		borderRadius: 12,
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
		color: "#888", // Será theme.loginLink
		fontSize: responsive.fontSize.sm,
		textDecorationLine: "underline",
	},
});