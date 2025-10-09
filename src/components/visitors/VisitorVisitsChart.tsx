/**
 * Visitor Visits Chart Component
 * Componente para exibir gráfico de visitas do visitante
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface VisitData {
  date: string;
  count: number;
}

interface VisitorVisitsChartProps {
  visits: any[];
}

export const VisitorVisitsChart: React.FC<VisitorVisitsChartProps> = ({ visits }) => {
  const chartData = useMemo(() => {
    // Agrupar visitas por mês
    const monthlyVisits: { [key: string]: number } = {};

    visits.forEach(visit => {
      const date = new Date(visit.timestamp);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyVisits[monthKey]) {
        monthlyVisits[monthKey] = 0;
      }
      monthlyVisits[monthKey]++;
    });

    // Converter para array e ordenar
    return Object.entries(monthlyVisits)
      .map(([month, count]) => ({
        date: month,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-6); // Últimos 6 meses
  }, [visits]);

  const maxCount = Math.max(...chartData.map(d => d.count), 1);
  const chartHeight = 200;

  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
  };

  if (chartData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>📊 Nenhum dado de visitas disponível</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Visitas por Mês</Text>

      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {[maxCount, Math.floor(maxCount * 0.75), Math.floor(maxCount * 0.5), Math.floor(maxCount * 0.25), 0].map((value, index) => (
            <Text key={index} style={styles.yAxisLabel}>{value}</Text>
          ))}
        </View>

        {/* Chart area */}
        <View style={styles.chartArea}>
          {chartData.map((data, index) => {
            const barHeight = (data.count / maxCount) * chartHeight;
            const barWidth = (width - 80) / chartData.length - 10;

            return (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      width: barWidth,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{formatMonth(data.date)}</Text>
                <Text style={styles.barValue}>{data.count}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendText}>
          Total de visitas nos últimos 6 meses: {chartData.reduce((sum, d) => sum + d.count, 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
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
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 220,
    marginBottom: 16,
  },
  yAxis: {
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#666',
  },
  chartArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    position: 'absolute',
    top: -20,
  },
  legend: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  legendText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});