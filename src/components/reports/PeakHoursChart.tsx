/**
 * Peak Hours Chart Component
 * Gráfico de barras mostrando horários de pico de acessos
 */

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { AccessLog } from '../../types/accessTypes';

interface PeakHoursChartProps {
  logs: AccessLog[];
}

export const PeakHoursChart: React.FC<PeakHoursChartProps> = ({ logs }) => {
  const screenWidth = Dimensions.get('window').width;

  const chartData = useMemo(() => {
    const hourlyData: Record<number, number> = {};

    // Inicializar horas (8h às 18h)
    for (let hour = 8; hour <= 18; hour++) {
      hourlyData[hour] = 0;
    }

    // Contar acessos por hora
    logs.forEach(log => {
      const hour = new Date(log.timestamp).getHours();
      if (hour >= 8 && hour <= 18) {
        hourlyData[hour]++;
      }
    });

    const labels = Object.keys(hourlyData).map(h => `${h}h`);
    const data = Object.values(hourlyData);

    return {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };
  }, [logs]);

  if (logs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sem dados para exibir</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários de Pico</Text>
      <Text style={styles.subtitle}>Acessos por hora do dia</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontSize: 10,
          },
        }}
        style={styles.chart}
        showValuesOnTopOfBars
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
