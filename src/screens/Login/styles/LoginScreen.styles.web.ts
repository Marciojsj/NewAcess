import { StyleSheet } from "react-native";
import { responsive } from "../../../utils/responsive";

// Estilos específicos para web que não são suportados pelo StyleSheet
const webSpecificStyles = {
	container: { minHeight: "100vh" as any },
	formContainer: {
		backdropFilter: "blur(10px)" as any,
		boxShadow: "0 20px 40px rgba(0,0,0,0.3)" as any,
	},
	inputWrapper: { transition: "all 0.3s ease" as any },
	input: { outlineStyle: "none" as any },
	loginButton: { transition: "all 0.2s ease" as any, cursor: "pointer" as any },
	loginButtonLoading: { cursor: "not-allowed" as any },
	linkButton: { cursor: "pointer" as any },
	linkText: { transition: "color 0.2s ease" as any },
};

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0a0a0a", // Será theme.loginBackground
		justifyContent: "center",
		alignItems: "center",
		...webSpecificStyles.container,
	},
	themeTogglePosition: {
		position: "absolute" as const,
		top: 40,
		right: 40,
		zIndex: 1000,
	},
	backgroundContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflow: "hidden",
	},
	circle1: {
		position: "absolute",
		width: 400,
		height: 400,
		borderRadius: 200,
		borderWidth: 2,
		borderColor: "rgba(138, 43, 226, 0.1)", // Será theme.loginCircle1
		top: -100,
		right: 100,
	},
	circle2: {
		position: "absolute",
		width: 750,
		height: 750,
		borderRadius: 400,
		borderWidth: 2,
		borderColor: "rgba(49, 40, 58, 0.64)", // Será theme.loginCircle2
		bottom: -200,
		right: -150,
	},
	circle3: {
		position: "absolute",
		width: 600,
		height: 600,
		borderRadius: 400,
		borderWidth: 2,
		borderColor: "rgba(137, 43, 226, 0.19)", // Será theme.loginCircle3
		top: "30%",
		left: "10%",
	},
	circle4: {
		position: "absolute",
		width: 500,
		height: 500,
		borderRadius: 250,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.08)", // Será theme.loginCircle4
		bottom: "38%",
		left: "5%",
	},
	formContainer: {
		width: "100%",
		maxWidth: 500,
		margin: "auto",
		backgroundColor: "rgba(255, 255, 255, 0.05)", // Será theme.loginCard
		borderRadius: 20,
		padding: responsive.padding.xl * 1.5,
		...webSpecificStyles.formContainer,
	},
	headerContainer: {
		alignItems: "center",
		marginBottom: responsive.spacing.xl * 2,
	},
	title: {
		fontSize: 36,
		fontWeight: "bold",
		color: "#ffffff", // Será theme.loginText
		marginBottom: responsive.spacing.sm,
		textAlign: "center",
	},
	subtitle: {
		fontSize: responsive.fontSize.lg,
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
		color: "#ffffff", // Será theme.loginText
		marginBottom: responsive.spacing.sm,
		fontWeight: "600",
	},
	inputWrapper: {
		backgroundColor: "rgba(255, 255, 255, 0.1)", // Será theme.backgroundCard
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "transparent",
		...webSpecificStyles.inputWrapper,
	},
	inputWrapperFocused: {
		borderColor: "#8a2be2", // Será theme.loginButton
		backgroundColor: "rgba(138, 43, 226, 0.1)", // Será theme.loginCircle1
		transform: [{ scale: 1.02 }],
	},
	inputWrapperError: {
		borderColor: "#ff4757", // Será theme.loginError
	},
	input: {
		height: 60,
		paddingHorizontal: responsive.padding.md,
		fontSize: responsive.fontSize.md,
		color: "#ffffff", // Será theme.loginInputText
		...webSpecificStyles.input,
	},
	inputFocused: {},
	errorText: {
		color: "#ff4757", // Será theme.loginError
		fontSize: responsive.fontSize.sm,
		marginTop: responsive.spacing.sm,
	},
	loginButton: {
		height: 60,
		backgroundColor: "#8a2be2", // Será theme.loginButton
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsive.spacing.lg,
		...webSpecificStyles.loginButton,
	},
	loginButtonLoading: {
		opacity: 0.8,
		...webSpecificStyles.loginButtonLoading,
	},
	loginButtonText: {
		color: "#ffffff", // Será theme.loginButtonText
		fontSize: responsive.fontSize.lg,
		fontWeight: "600",
	},
	loadingIcon: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#ffffff", // Será theme.loginButtonText
		borderTopColor: "transparent",
	},
	linksContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: responsive.spacing.lg,
	},
	linkButton: {
		padding: responsive.padding.sm,
		...webSpecificStyles.linkButton,
	},
	linkText: {
		color: "#8a2be2", // Será theme.loginLink
		fontSize: responsive.fontSize.sm,
		fontWeight: "500",
		...webSpecificStyles.linkText,
	},
});