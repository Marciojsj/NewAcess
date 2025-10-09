/**
 * Access Trends Chart Component
 * Gráfico de linha mostrando tendências de entradas/saídas ao longo do tempo
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AccessLog } from '../../types/accessTypes';

interface AccessTrendsChartProps {
  logs: AccessLog[];
  period: 'daily' | 'weekly' | 'monthly';
}

export const AccessTrendsChart: React.FC<AccessTrendsChartProps> = ({ logs, period }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartData = useMemo(() => {
    const now = new Date();
    const groupedData: Record<string, { entries: number; exits: number }> = {};

    // Determinar quantos períodos mostrar
    const periodsToShow = period === 'daily' ? 7 : period === 'weekly' ? 12 : 6;

    // Inicializar períodos
    for (let i = periodsToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      let label = '';

      if (period === 'daily') {
        date.setDate(date.getDate() - i);
        label = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      } else if (period === 'weekly') {
        date.setDate(date.getDate() - (i * 7));
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 6);
        label = `${date.getDate()}/${date.getMonth() + 1}`;
      } else {
        date.setMonth(date.getMonth() - i);
        label = date.toLocaleDateString('pt-BR', { month: 'short' });
      }

      groupedData[label] = { entries: 0, exits: 0 };
    }

    // Agrupar logs
    logs.forEach(log => {
      const logDate = new Date(log.timestamp);
      let label = '';

      if (period === 'daily') {
        label = logDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      } else if (period === 'weekly') {
        const weekStart = new Date(logDate);
        weekStart.setDate(logDate.getDate() - logDate.getDay());
        label = `${weekStart.getDate()}/${weekStart.getMonth() + 1}`;
      } else {
        label = logDate.toLocaleDateString('pt-BR', { month: 'short' });
      }

      if (groupedData[label]) {
        if (log.type === 'ENTRY') {
          groupedData[label].entries++;
        } else {
          groupedData[label].exits++;
        }
      }
    });

    const labels = Object.keys(groupedData);
    const entriesData = labels.map(label => groupedData[label].entries);
    const exitsData = labels.map(label => groupedData[label].exits);

    return {
      labels,
      datasets: [
        {
          data: entriesData,
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          strokeWidth: 2,
        },
        {
          data: exitsData,
          color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ['Entradas', 'Saídas'],
    };
  }, [logs, period]);

  if (logs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sem dados para exibir</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tendências de Acesso</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
          },
        }}
        bezier
        style={styles.chart}
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
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
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
