import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ResponsiveContainer } from '../../components/ResponsiveContainer';
import { responsive, deviceType } from '../../utils/responsive';

export default function VisitantesScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#2D3436"
        {...(Platform.OS === 'web' && { hidden: true })}
      />
      <ResponsiveContainer>
      <View style={styles.content}>
        <Text style={[styles.title, deviceType.isDesktop && styles.titleDesktop]}>
          Visitantes
        </Text>
        <Text style={[styles.subtitle, deviceType.isDesktop && styles.subtitleDesktop]}>
          Aqui você pode gerenciar os visitantes.
        </Text>

        <TouchableOpacity 
          style={[styles.backButton, deviceType.isDesktop && styles.backButtonDesktop]} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.backButtonText, deviceType.isDesktop && styles.backButtonTextDesktop]}>
            Voltar para Home
          </Text>
        </TouchableOpacity>
      </View>
      </ResponsiveContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#2D3436', 
    justifyContent: 'center', 
    alignItems: 'center',
    ...(Platform.OS === 'web' && { minHeight: typeof window !== 'undefined' ? window.innerHeight : 0 })
  },
  content: { 
    padding: responsive.padding.lg, 
    alignItems: 'center',
    maxWidth: deviceType.isDesktop ? 600 : '100%',
  },
  title: { 
    fontSize: responsive.fontSize.xl, 
    fontWeight: '700', 
    color: '#FFFFFF', 
    marginBottom: responsive.spacing.md,
    textAlign: 'center',
  },
  titleDesktop: {
    fontSize: responsive.fontSize.xxl,
  },
  subtitle: { 
    fontSize: responsive.fontSize.md, 
    color: '#B2BEC3', 
    textAlign: 'center', 
    marginBottom: responsive.spacing.lg,
    lineHeight: 24,
  },
  subtitleDesktop: {
    fontSize: responsive.fontSize.lg,
    marginBottom: responsive.spacing.xl,
  },
  backButton: { 
    backgroundColor: '#8a2be2', 
    paddingVertical: responsive.padding.md, 
    paddingHorizontal: responsive.padding.lg, 
    borderRadius: 12,
    minWidth: 160,
  },
  backButtonDesktop: {
    paddingVertical: responsive.padding.lg,
    paddingHorizontal: responsive.padding.xl,
    minWidth: 200,
  },
  backButtonText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: responsive.fontSize.md,
    textAlign: 'center',
  },
  backButtonTextDesktop: {
    fontSize: responsive.fontSize.lg,
  },
});
