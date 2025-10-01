import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	Animated,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	Easing,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { ThemeToggle } from "../../components/ThemeToggle";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { responsive, deviceType, useResponsive } from "../../utils/responsive";

import styles from "./styles/LoginScreen.styles";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailFocused, setEmailFocused] = useState(false);
	const [passwordFocused, setPasswordFocused] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const { login, isLoading } = useAuth();
	const { theme, isDark } = useTheme();

	const fadeAnimation = useRef(new Animated.Value(0)).current;
	const slideAnimation = useRef(new Animated.Value(50)).current;
	const scaleAnimation = useRef(new Animated.Value(0.9)).current;
	const buttonScaleAnimation = useRef(new Animated.Value(1)).current;
	const loadingRotationAnimation = useRef(new Animated.Value(0)).current;

	const circle1Animation = useRef(new Animated.Value(0)).current;
	const circle2Animation = useRef(new Animated.Value(0)).current;
	const circle3Animation = useRef(new Animated.Value(0)).current;
	const circle4Animation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.parallel([
			Animated.timing(fadeAnimation, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}),
			Animated.timing(slideAnimation, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnimation, {
				toValue: 1,
				duration: 800,
				useNativeDriver: true,
			}),
		]).start();

		const startCircleAnimations = () => {
			Animated.loop(
				Animated.sequence([
					Animated.timing(circle1Animation, {
						toValue: 1,
						duration: 8000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
					Animated.timing(circle1Animation, {
						toValue: 0,
						duration: 8000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
				])
			).start();

			Animated.loop(
				Animated.sequence([
					Animated.timing(circle2Animation, {
						toValue: 1,
						duration: 10000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
					Animated.timing(circle2Animation, {
						toValue: 0,
						duration: 10000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
				])
			).start();

			Animated.loop(
				Animated.sequence([
					Animated.timing(circle3Animation, {
						toValue: 1,
						duration: 9000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
					Animated.timing(circle3Animation, {
						toValue: 0,
						duration: 9000,
						easing: Easing.inOut(Easing.sin),
						useNativeDriver: true,
					}),
				])
			).start();

			if (Platform.OS === 'web') {
				Animated.loop(
					Animated.sequence([
						Animated.timing(circle4Animation, {
							toValue: 1,
							duration: 7000,
							easing: Easing.inOut(Easing.sin),
							useNativeDriver: true,
						}),
						Animated.timing(circle4Animation, {
							toValue: 0,
							duration: 7000,
							easing: Easing.inOut(Easing.sin),
							useNativeDriver: true,
						}),
					])
				).start();
			}
		};

		startCircleAnimations();
	}, [fadeAnimation, slideAnimation, scaleAnimation, circle1Animation, circle2Animation, circle3Animation, circle4Animation]);

	useEffect(() => {
		if (isLoading) {
			const loadingAnimation = Animated.loop(
				Animated.timing(loadingRotationAnimation, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				})
			);
			loadingAnimation.start();
			return () => loadingAnimation.stop();
		}
	}, [isLoading]);

	const circle1TranslateY = circle1Animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -60],
	});

	const circle2TranslateX = circle2Animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 80],
	});

	const circle3TranslateY = circle3Animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -40],
	});

	const circle3TranslateX = circle3Animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -30],
	});

	const circle4TranslateY = circle4Animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -50],
	});

	const loadingRotationInterpolate = loadingRotationAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			setEmailError("Email é obrigatório");
			return false;
		}
		if (!emailRegex.test(email)) {
			setEmailError("Email inválido");
			return false;
		}
		setEmailError("");
		return true;
	};

	const validatePassword = (password: string) => {
		if (!password) {
			setPasswordError("Senha é obrigatória");
			return false;
		}
		if (password.length < 6) {
			setPasswordError("Senha deve ter pelo menos 6 caracteres");
			return false;
		}
		setPasswordError("");
		return true;
	};

	const handleLogin = async () => {
		const isEmailValid = validateEmail(email);
		const isPasswordValid = validatePassword(password);

		if (!isEmailValid || !isPasswordValid) return;

		Animated.sequence([
			Animated.timing(buttonScaleAnimation, {
				toValue: 0.95,
				duration: 100,
				useNativeDriver: true,
			}),
			Animated.timing(buttonScaleAnimation, {
				toValue: 1,
				duration: 100,
				useNativeDriver: true,
			}),
		]).start();

		try {
			await login(email, password);
		} catch (error) {
			Alert.alert("Erro", "Falha no login. Tente novamente.");
		}
	};

	return (
		<KeyboardAvoidingView
			style={[styles.container, { backgroundColor: theme.loginBackground }]}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<StatusBar
				barStyle={isDark ? "light-content" : "dark-content"}
				backgroundColor={theme.loginBackground}
				{...(Platform.OS === "web" && { hidden: true })}
			/>

			<View style={styles.themeTogglePosition}>
				<ThemeToggle size={50} />
			</View>

			<View style={styles.backgroundContainer}>
				<Animated.View
					style={[
						styles.circle1,
						{
							transform: [{ translateY: circle1TranslateY }],
							borderColor: theme.loginCircle1
						},
					]}
				/>

				<Animated.View
					style={[
						styles.circle2,
						{
							transform: [{ translateX: circle2TranslateX }],
							borderColor: theme.loginCircle2
						},
					]}
				/>

				<Animated.View
					style={[
						styles.circle3,
						{
							transform: [
								{ translateY: circle3TranslateY },
								{ translateX: circle3TranslateX }
							],
							borderColor: theme.loginCircle3
						},
					]}
				/>

				{Platform.OS === 'web' && (
					<Animated.View
						style={[
							styles.circle4,
							{
								transform: [{ translateY: circle4TranslateY }],
								borderColor: theme.loginCircle4
							},
						]}
					/>
				)}
			</View>

			<ResponsiveContainer maxWidth={deviceType.isDesktop ? 500 : undefined}>
				<Animated.View
					style={[
						styles.formContainer,
						{
							opacity: fadeAnimation,
							transform: [{ translateY: slideAnimation }, { scale: scaleAnimation }],
							// backgroundColor: theme.loginCard
						},
					]}
				>
					<View style={styles.headerContainer}>
						<Text style={[styles.title, { color: theme.loginText }]}>Controle de Acesso</Text>
						<Text style={[styles.subtitle, { color: theme.loginTextSecondary }]}>Faça login para continuar</Text>
					</View>

					<View style={styles.form}>
						<View style={styles.inputContainer}>
							<Text style={[styles.inputLabel, { color: theme.loginTextSecondary }]}>Email</Text>
							<Animated.View
								style={[
									styles.inputWrapper,
									{ 
										backgroundColor: theme.backgroundCard, 
										borderColor: emailFocused ? theme.loginButton : theme.loginBorder 
									},
									emailFocused && {
										...styles.inputWrapperFocused,
										borderColor: theme.loginButton,
										backgroundColor: theme.loginCircle1,
										shadowColor: theme.loginButton
									},
									emailError && {
										borderColor: theme.loginError,
										backgroundColor: theme.errorLight
									},
								]}
							>
								<TextInput
									style={[styles.input, { color: theme.loginInputText }]}
									placeholder="Digite seu email"
									placeholderTextColor={theme.loginInputPlaceholder}
									value={email}
									onChangeText={(text) => {
										setEmail(text);
										if (emailError) validateEmail(text);
									}}
									onFocus={() => setEmailFocused(true)}
									onBlur={() => {
										setEmailFocused(false);
										validateEmail(email);
									}}
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
								/>
							</Animated.View>
							{emailError ? (
								<Text style={[styles.errorText, { color: theme.loginError }]}>{emailError}</Text>
							) : null}
						</View>

						<View style={styles.inputContainer}>
							<Text style={[styles.inputLabel, { color: theme.loginTextSecondary }]}>Senha</Text>
							<Animated.View
								style={[
									styles.inputWrapper,
									{ 
										backgroundColor: theme.backgroundCard, 
										borderColor: passwordFocused ? theme.loginButton : theme.loginBorder 
									},
									passwordFocused && {
										...styles.inputWrapperFocused,
										borderColor: theme.loginButton,
										backgroundColor: theme.loginCircle1,
										shadowColor: theme.loginButton
									},
									passwordError && {
										borderColor: theme.loginError,
										backgroundColor: theme.errorLight
									},
								]}
							>
								<TextInput
									style={[styles.input, { color: theme.loginInputText }]}
									placeholder="Digite sua senha"
									placeholderTextColor={theme.loginInputPlaceholder}
									value={password}
									onChangeText={(text) => {
										setPassword(text);
										if (passwordError) validatePassword(text);
									}}
									onFocus={() => setPasswordFocused(true)}
									onBlur={() => {
										setPasswordFocused(false);
										validatePassword(password);
									}}
									secureTextEntry
								/>
							</Animated.View>
							{passwordError ? (
								<Text style={[styles.errorText, { color: theme.loginError }]}>{passwordError}</Text>
							) : null}
						</View>

						<Animated.View style={{ transform: [{ scale: buttonScaleAnimation }] }}>
							<TouchableOpacity
								style={[
									styles.loginButton, 
									{ backgroundColor: theme.loginButton },
									isLoading && { backgroundColor: theme.loginButtonBackgroundDisabled }
								]}
								onPress={handleLogin}
								disabled={isLoading}
								activeOpacity={0.8}
							>
								{isLoading ? (
									<Animated.View
										style={[
											styles.loadingIcon,
											{ 
												transform: [{ rotate: loadingRotationInterpolate }],
												borderColor: theme.loginButtonText,
												borderTopColor: "transparent"
											},
										]}
									/>
								) : (
									<Text style={[styles.loginButtonText, { color: theme.loginButtonText }]}>Entrar</Text>
								)}
							</TouchableOpacity>
						</Animated.View>

						<View style={styles.linksContainer}>
							<TouchableOpacity
								style={styles.linkButton}
								onPress={() => Alert.alert("Info", "Funcionalidade em desenvolvimento")}
							>
								<Text style={[styles.linkText, { color: theme.loginLink }]}>Esqueci minha senha</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.linkButton}
								onPress={() => Alert.alert("Info", "Funcionalidade em desenvolvimento")}
							>
								<Text style={[styles.linkText, { color: theme.loginLink }]}>Criar conta</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Animated.View>
			</ResponsiveContainer>
		</KeyboardAvoidingView>
	);
}