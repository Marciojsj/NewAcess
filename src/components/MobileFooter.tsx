import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import { responsive, deviceType } from '../utils/responsive';

interface FooterAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface MobileFooterProps {
  visible?: boolean;
}

export const MobileFooter: React.FC<MobileFooterProps> = ({ visible = true }) => {
  const slideAnim = useRef(new Animated.Value(visible ? 0 : 100)).current;

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const footerActions: FooterAction[] = [
    {
      id: '1',
      title: 'Suporte',
      icon: '💬',
      color: '#6c5ce7',
      onPress: () => Alert.alert('Suporte', 'Entre em contato conosco para ajuda'),
    },
    {
      id: '2',
      title: 'Sobre',
      icon: 'ℹ️',
      color: '#00b894',
      onPress: () => Alert.alert('Sobre', 'Sistema de Controle de Acesso v1.0'),
    },
    {
      id: '3',
      title: 'Config',
      icon: '⚙️',
      color: '#fdcb6e',
      onPress: () => Alert.alert('Configurações', 'Funcionalidade em desenvolvimento'),
    },
  ];

  if (deviceType.isDesktop || Platform.OS === 'web') {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.content}>
        {footerActions.map((action) => (
          <FooterButton key={action.id} action={action} />
        ))}
      </View>
    </Animated.View>
  );
};

const FooterButton: React.FC<{ action: FooterAction }> = ({ action }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      action.onPress();
    });
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: action.color }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.icon}>{action.icon}</Text>
        <Text style={styles.title}>{action.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  container: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: Platform.OS === 'ios' ? 34 : responsive.padding.md, // Safe area para iOS
  },
  content: {
    flexDirection: 'row' as const,
    justifyContent: 'space-around' as const,
    alignItems: 'center' as const,
    paddingVertical: responsive.padding.md,
    paddingHorizontal: responsive.padding.lg,
  },
  button: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: responsive.padding.sm,
    paddingHorizontal: responsive.padding.md,
    borderRadius: 12,
    minWidth: 80,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  title: {
    color: '#ffffff',
    fontSize: responsive.fontSize.xs,
    fontWeight: '600' as const,
    textAlign: 'center' as const,
  },
};