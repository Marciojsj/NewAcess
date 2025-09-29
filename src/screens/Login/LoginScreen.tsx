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
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { responsive, deviceType, useResponsive } from "../../utils/responsive";

// Import condicional dos estilos
const styles = Platform.select({
  web: require("./styles/LoginScreen.styles.web").default,
  default: require("./styles/LoginScreen.styles.native").default,
});

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, isLoading } = useAuth();
  const dimensions = useResponsive();

  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const circleRotation = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const loadingRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // círculos girando
    const circleAnimation = Animated.loop(
      Animated.timing(circleRotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );
    circleAnimation.start();

    return () => circleAnimation.stop();
  }, []);

  useEffect(() => {
    if (isLoading) {
      const loadingAnimation = Animated.loop(
        Animated.timing(loadingRotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      );
      loadingAnimation.start();
      return () => loadingAnimation.stop();
    }
  }, [isLoading]);

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
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
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

  const circleRotationInterpolate = circleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const loadingRotationInterpolate = loadingRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0a0a0a"
        {...(Platform.OS === "web" && { hidden: true })}
      />

      {/* fundo animado */}
      {!deviceType.isDesktop && (
        <View style={styles.backgroundContainer}>
          <Animated.View
            style={[
              styles.circle1,
              { transform: [{ rotate: circleRotationInterpolate }] },
            ]}
          />
          <Animated.View
            style={[
              styles.circle2,
              { transform: [{ rotate: circleRotationInterpolate }] },
            ]}
          />
          <Animated.View
            style={[
              styles.circle3,
              {
                transform: [
                  {
                    rotate: circleRotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["360deg", "0deg"],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      )}

      <ResponsiveContainer maxWidth={deviceType.isDesktop ? 500 : undefined}>
        <Animated.View
          style={[
            styles.formContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* título */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Controle de Acesso</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
          </View>

          {/* formulário */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  emailFocused && styles.inputWrapperFocused,
                  emailError && styles.inputWrapperError,
                ]}
              >
                <TextInput
                  style={[styles.input, emailFocused && styles.inputFocused]}
                  placeholder="Digite seu email"
                  placeholderTextColor="#666"
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
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>

            {/* Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  passwordFocused && styles.inputWrapperFocused,
                  passwordError && styles.inputWrapperError,
                ]}
              >
                <TextInput
                  style={[styles.input, passwordFocused && styles.inputFocused]}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#666"
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
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Botão */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonLoading]}
                onPress={handleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <Animated.View
                    style={[
                      styles.loadingIcon,
                      { transform: [{ rotate: loadingRotationInterpolate }] },
                    ]}
                  />
                ) : (
                  <Text style={styles.loginButtonText}>Entrar</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Links */}
            <View style={styles.linksContainer}>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  Alert.alert("Info", "Funcionalidade em desenvolvimento")
                }
              >
                <Text style={styles.linkText}>Esqueci minha senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  Alert.alert("Info", "Funcionalidade em desenvolvimento")
                }
              >
                <Text style={styles.linkText}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ResponsiveContainer>
    </KeyboardAvoidingView>
  );
}
