import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { responsive, deviceType, useResponsive } from '../../utils/responsive';

// Captura das dimensões da tela para cálculos de posicionamento dos elementos animados
const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login, isLoading } = useAuth();
  const dimensions = useResponsive();

  // Configuração das animações - valores iniciais ajustados para efeitos específicos
  // Fade inicia em 0 (invisível) para aparecer gradualmente
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Slide inicia em 50px abaixo para movimento de entrada de baixo para cima
  const slideAnim = useRef(new Animated.Value(50)).current;
  // Escala inicia em 0.9 (10% menor) para efeito de crescimento
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  // Rotação dos círculos de fundo - inicia em 0 para rotação completa
  const circleRotation = useRef(new Animated.Value(0)).current;
  // Escala do botão - inicia em 1 (tamanho normal) para efeito de pressão
  const buttonScale = useRef(new Animated.Value(1)).current;
  // Rotação do loading - inicia em 0 para spinner
  const loadingRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de entrada - múltiplas animações paralelas para efeito coordenado
    Animated.parallel([
      // Fade in - duração longa (1000ms) para entrada suave
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Slide up - duração média (800ms) para movimento natural
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      // Scale up - duração igual ao slide para coordenação
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação contínua dos círculos de fundo - loop infinito com duração longa
    // 20 segundos para movimento muito suave e não distrativo
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
    // Animação de loading condicional - apenas quando isLoading é true
    if (isLoading) {
      // Spinner rápido - 1 segundo por rotação para feedback visual ativo
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
    // Regex para validação de email - padrão básico mas eficiente
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email é obrigatório');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Email inválido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Senha é obrigatória');
      return false;
    }
    // Validação de comprimento mínimo - 6 caracteres para segurança básica
    if (password.length < 6) {
      setPasswordError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    // ========================================================================
    // Validação de credenciais específicas comentada para permitir qualquer login
    // Em produção, esta validação seria feita no backend
    // ========================================================================
    /*
    if (email !== 'teste@teste.com' || password !== '123456') {
      Alert.alert('Erro', 'Email ou senha inválidos');
      return;
    }
    */

    // Animação de feedback do botão - sequência rápida para resposta imediata
    // Reduz para 95% do tamanho e volta ao normal
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
      Alert.alert('Erro', 'Falha no login. Tente novamente.');
    }
  };


  // Interpolação das rotações - conversão de valores 0-1 para graus
  // Rotação normal para círculos de fundo
  const circleRotationInterpolate = circleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Rotação do loading spinner - mesmo padrão para consistência
  const loadingRotationInterpolate = loadingRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0a0a0a"
        {...(Platform.OS === 'web' && { hidden: true })}
      />

      {/* Background com círculos animados - apenas em dispositivos móveis para performance */}
      {/* Desktop omite animações de fundo para focar no formulário */}
      {!deviceType.isDesktop && (
        <View style={styles.backgroundContainer}>
        {/* Primeiro círculo - 80% da largura da tela, posicionado no topo */}
        <Animated.View
          style={[
            styles.circle1,
            {
              transform: [{ rotate: circleRotationInterpolate }]
            }
          ]}
        />
        {/* Segundo círculo - 120% da largura (maior), posicionado mais abaixo */}
        <Animated.View
          style={[
            styles.circle2,
            {
              transform: [{ rotate: circleRotationInterpolate }]
            }
          ]}
        />
        {/* Terceiro círculo - 60% da largura (menor), rotação inversa, posicionado à direita */}
        <Animated.View
          style={[
            styles.circle3,
            {
              transform: [{
                // Rotação inversa para movimento contrário aos outros círculos
                rotate: circleRotation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['360deg', '0deg'],
                })
              }]
            }
          ]}
        />
      </View>
      )}

      <ResponsiveContainer maxWidth={deviceType.isDesktop ? 500 : undefined}>
        {/* Container principal do formulário com animações de entrada */}
        <Animated.View
        style={[
          styles.formContainer,
          {
            // Aplicação das três animações: fade, slide e scale
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          },
          // Estilo específico para desktop - fundo semi-transparente e bordas arredondadas
          deviceType.isDesktop && styles.formContainerDesktop
        ]}
      >
        {/* Seção de cabeçalho - título e subtítulo da aplicação */}
        <View style={styles.headerContainer}>
          {/* Título principal - fonte grande e responsiva */}
          <Text style={[styles.title, deviceType.isDesktop && styles.titleDesktop]}>
            Controle de Acesso
          </Text>
          {/* Subtítulo explicativo - fonte menor e cor mais suave */}
          <Text style={[styles.subtitle, deviceType.isDesktop && styles.subtitleDesktop]}>
            Faça login para continuar
          </Text>
        </View>

        {/* Seção principal do formulário - campos de entrada e botão */}
        <View style={styles.form}>
          {/* Container do campo de email - inclui label, input e erro */}
          <View style={styles.inputContainer}>
            {/* Label do campo - texto pequeno acima do input */}
            <Text style={styles.inputLabel}>Email</Text>
            {/* Wrapper animado do input - muda cor baseado no estado */}
            <Animated.View
              style={[
                styles.inputWrapper,
                // Estado focado - borda roxa e fundo com transparência
                emailFocused && styles.inputWrapperFocused,
                // Estado de erro - borda vermelha e fundo avermelhado
                emailError && styles.inputWrapperError,
              ]}
            >
              {/* Input de email - configurações específicas para email */}
              <TextInput
                style={[
                  styles.input,
                  // Estilo adicional quando focado
                  emailFocused && styles.inputFocused,
                ]}
                placeholder="Digite seu email"
                // Cor do placeholder mais escura para contraste
                placeholderTextColor="#666"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  // Validação em tempo real apenas se já houver erro
                  if (emailError) validateEmail(text);
                }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => {
                  setEmailFocused(false);
                  // Validação completa ao perder foco
                  validateEmail(email);
                }}
                // Configurações específicas para email
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Animated.View>
            {/* Mensagem de erro condicional - aparece apenas se houver erro */}
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>

          {/* Container do campo de senha - estrutura similar ao email */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <Animated.View
              style={[
                styles.inputWrapper,
                // Estados visuais iguais ao campo de email
                passwordFocused && styles.inputWrapperFocused,
                passwordError && styles.inputWrapperError,
              ]}
            >
              <TextInput
                style={[
                  styles.input,
                  passwordFocused && styles.inputFocused,
                ]}
                placeholder="Digite sua senha"
                placeholderTextColor="#666"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  // Validação em tempo real para senha
                  if (passwordError) validatePassword(text);
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => {
                  setPasswordFocused(false);
                  validatePassword(password);
                }}
                // Campo seguro para ocultar texto da senha
                secureTextEntry
              />
            </Animated.View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Botão de login com animação de escala */}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[
                styles.loginButton,
                // Estilo diferente quando está carregando
                isLoading && styles.loginButtonLoading
              ]}
              onPress={handleLogin}
              // Desabilita botão durante loading
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {/* Conteúdo condicional - spinner durante loading, texto normal caso contrário */}
              {isLoading ? (
                {/* Spinner animado - círculo com rotação contínua */}
                <Animated.View
                  style={[
                    styles.loadingIcon,
                    { transform: [{ rotate: loadingRotationInterpolate }] }
                  ]}
                />
              ) : (
                {/* Texto do botão - fonte grande e peso médio */}
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* Seção de links secundários - esqueci senha e criar conta */}
          <View style={styles.linksContainer}>
            {/* Link para recuperação de senha */}
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => Alert.alert('Info', 'Funcionalidade em desenvolvimento')}
            >
              <Text style={styles.linkText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            {/* Link para criação de conta */}
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => Alert.alert('Info', 'Funcionalidade em desenvolvimento')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    // Configuração específica para web - altura mínima e centralização
    ...(Platform.OS === 'web' && {
      minHeight: Dimensions.get('window').height,
      justifyContent: 'center',
    }),
  },
  // Container absoluto para círculos de fundo
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  // Primeiro círculo - 80% da largura, posicionado no topo (10% da altura)
  circle1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    // Borda sutil e transparente
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    top: height * 0.1,
    left: width * 0.1,
  },
  // Segundo círculo - 120% da largura (maior), posicionado mais abaixo
  circle2: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    // Borda ainda mais sutil
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    top: height * 0.2,
    // Posicionado parcialmente fora da tela à esquerda
    left: -width * 0.1,
  },
  // Terceiro círculo - 60% da largura (menor), com cor temática
  circle3: {
    position: 'absolute',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    borderWidth: 1,
    // Cor roxa com transparência para destaque sutil
    borderColor: 'rgba(138, 43, 226, 0.3)',
    top: height * 0.4,
    // Posicionado parcialmente fora da tela à direita
    right: -width * 0.1,
  },
  formContainer: {
    flex: 1,
    // Centralização vertical do formulário
    justifyContent: 'center',
    // Padding generoso para espaçamento das bordas
    paddingHorizontal: responsive.padding.xl,
    paddingVertical: responsive.padding.xl,
  },
  formContainerDesktop: {
    // Remove flex em desktop para tamanho natural
    flex: 0,
    // Fundo semi-transparente para destaque
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    // Bordas bem arredondadas para aparência moderna
    borderRadius: 20,
    // Padding aumentado em desktop
    padding: responsive.padding.xl * 1.5,
    // Sombra específica para web
    ...(Platform.OS === 'web' && {
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    }),
  },
  headerContainer: {
    // Centralização dos elementos do header
    alignItems: 'center',
    // Margem inferior grande para separação do formulário
    marginBottom: responsive.spacing.xl * 2,
  },
  title: {
    // Fonte muito grande para impacto visual
    fontSize: responsive.fontSize.xxl,
    fontWeight: 'bold',
    color: '#ffffff',
    // Espaçamento pequeno entre título e subtítulo
    marginBottom: responsive.spacing.sm,
    textAlign: 'center',
  },
  titleDesktop: {
    // Fonte ainda maior em desktop - 36px
    fontSize: 36,
  },
  subtitle: {
    // Fonte média para subtítulo
    fontSize: responsive.fontSize.md,
    // Cor mais suave para hierarquia visual
    color: '#888',
    textAlign: 'center',
  },
  subtitleDesktop: {
    // Fonte grande em desktop para melhor legibilidade
    fontSize: responsive.fontSize.lg,
  },
  form: {
    // Largura total disponível
    width: '100%',
  },
  inputContainer: {
    // Margem inferior grande para espaçamento entre campos
    marginBottom: responsive.spacing.xl,
  },
  inputLabel: {
    // Fonte pequena para labels
    fontSize: responsive.fontSize.sm,
    // Cor clara mas não branca para hierarquia
    color: '#ccc',
    // Espaçamento pequeno entre label e input
    marginBottom: responsive.spacing.sm,
    // Peso médio para destaque sutil
    fontWeight: '500',
  },
  inputWrapper: {
    // Borda sutil padrão
    borderWidth: 1,
    borderColor: '#333',
    // Bordas arredondadas para aparência moderna
    borderRadius: 12,
    // Fundo semi-transparente
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  inputWrapperFocused: {
    // Borda roxa quando focado
    borderColor: '#8a2be2',
    // Fundo roxo transparente
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    // Sombra roxa para efeito de brilho
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  inputWrapperError: {
    // Borda vermelha para erro
    borderColor: '#ff4757',
    // Fundo vermelho transparente
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
  },
  input: {
    // Altura ajustada por dispositivo - desktop maior para melhor toque
    height: deviceType.isDesktop ? 60 : 56,
    // Padding horizontal para espaçamento interno
    paddingHorizontal: responsive.padding.md,
    // Fonte média para boa legibilidade
    fontSize: responsive.fontSize.md,
    color: '#ffffff',
  },
  inputFocused: {
    // Cor branca quando focado para destaque
    color: '#ffffff',
  },
  errorText: {
    // Cor vermelha para mensagens de erro
    color: '#ff4757',
    // Fonte pequena para não competir com o input
    fontSize: responsive.fontSize.xs,
    // Margem superior pequena para proximidade com o campo
    marginTop: responsive.spacing.xs,
    // Margem esquerda para alinhamento com o texto do input
    marginLeft: responsive.spacing.xs,
  },
  loginButton: {
    // Altura igual aos inputs para consistência
    height: deviceType.isDesktop ? 60 : 56,
    // Cor roxa principal para destaque
    backgroundColor: '#8a2be2',
    // Bordas arredondadas consistentes
    borderRadius: 12,
    // Centralização do conteúdo
    justifyContent: 'center',
    alignItems: 'center',
    // Margem superior para separação dos inputs
    marginTop: responsive.spacing.sm,
    // Sombra roxa para efeito de elevação
    shadowColor: '#8a2be2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonLoading: {
    // Cor cinza quando carregando para indicar inatividade
    backgroundColor: '#666',
  },
  loginButtonText: {
    color: '#ffffff',
    // Fonte grande para botão principal
    fontSize: responsive.fontSize.lg,
    // Peso semi-bold para destaque
    fontWeight: '600',
  },
  loadingIcon: {
    // Tamanho pequeno para spinner
    width: 24,
    height: 24,
    // Borda para criar círculo
    borderWidth: 2,
    borderColor: '#ffffff',
    // Topo transparente para efeito de spinner
    borderTopColor: 'transparent',
    // Bordas arredondadas para círculo perfeito
    borderRadius: 12,
  },
  linksContainer: {
    // Layout horizontal para links lado a lado
    flexDirection: 'row',
    // Espaço entre os links
    justifyContent: 'space-between',
    // Margem superior grande para separação do botão
    marginTop: responsive.spacing.xl * 1.5,
  },
  linkButton: {
    // Padding pequeno para área de toque
    paddingVertical: responsive.padding.xs,
    paddingHorizontal: responsive.padding.xs,
  },
  linkText: {
    // Cor cinza para links secundários
    color: '#888',
    // Fonte pequena para hierarquia
    fontSize: responsive.fontSize.sm,
    // Sublinhado para indicar que é clicável
    textDecorationLine: 'underline',
  },
});