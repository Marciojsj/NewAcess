/**
 * Visitor Distribution Chart Component
 * Gráfico de pizza mostrando distribuição de visitantes por empresa/entidade
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { AccessLog } from '../../types/accessTypes';

interface VisitorDistributionChartProps {
  logs: AccessLog[];
}

const COLORS = [
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#E91E63',
  '#9C27B0',
  '#00BCD4',
  '#CDDC39',
  '#FF5722',
];

export const VisitorDistributionChart: React.FC<VisitorDistributionChartProps> = ({ logs }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartData = useMemo(() => {
    const companyData: Record<string, number> = {};

    // Contar visitantes por empresa
    logs.forEach(log => {
      if (log.visitor?.company) {
        const company = log.visitor.company;
        companyData[company] = (companyData[company] || 0) + 1;
      } else {
        companyData['Sem Empresa'] = (companyData['Sem Empresa'] || 0) + 1;
      }
    });

    // Ordenar por quantidade e pegar top 8
    const sortedCompanies = Object.entries(companyData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    // Agrupar resto em "Outros"
    const topCompanies = sortedCompanies.slice(0, 7);
    const others = sortedCompanies.slice(7);
    
    if (others.length > 0) {
      const othersTotal = others.reduce((sum, [, count]) => sum + count, 0);
      topCompanies.push(['Outros', othersTotal]);
    }

    return topCompanies.map(([name, count], index) => ({
      name: name.length > 15 ? name.substring(0, 12) + '...' : name,
      population: count,
      color: COLORS[index % COLORS.length],
      legendFontColor: '#333',
      legendFontSize: 12,
    }));
  }, [logs]);

  if (logs.length === 0 || chartData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sem dados para exibir</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Distribuição por Empresa</Text>
      <Text style={styles.subtitle}>Total de acessos por organização</Text>
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
