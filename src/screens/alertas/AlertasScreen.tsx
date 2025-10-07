// src/screens/alertas/AlertasScreen.tsx
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ResponsiveContainer } from '../../components/layout/ResponsiveContainer';
import styles from './styles/AlertasScreen.styles';

export default function AlertasScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0a0a0a"
        {...(Platform.OS === 'web' && { hidden: true })}
      />
      <ResponsiveContainer>
        <View style={styles.content}>
          <Text style={styles.title}>Alertas</Text>
          <Text style={styles.subtitle}>
            Sistema de gerenciamento de alertas.
          </Text>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.backButtonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </View>
      </ResponsiveContainer>
    </SafeAreaView>
  );
}
