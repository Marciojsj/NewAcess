import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export default function RelatoriosScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Relatórios</Text>
        <Text style={styles.subtitle}>Aqui você pode acessar os relatórios de acesso.</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D3436', justifyContent: 'center', alignItems: 'center' },
  content: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#B2BEC3', textAlign: 'center', marginBottom: 20 },
  backButton: { backgroundColor: '#8a2be2', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  backButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
