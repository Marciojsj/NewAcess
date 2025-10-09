/**
 * Report Export Button Component
 * Botão para exportar relatórios em diferentes formatos
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { AccessLog } from '../../types/accessTypes';
import { DashboardStats } from '../../types/reportTypes';

interface ReportExportButtonProps {
  stats: DashboardStats | null;
  logs: AccessLog[];
  format: 'csv' | 'json' | 'pdf';
}

export const ReportExportButton: React.FC<ReportExportButtonProps> = ({
  stats,
  logs,
  format,
}) => {
  const [exporting, setExporting] = useState(false);

  const generateCSV = () => {
    const headers = [
      'Data/Hora',
      'Tipo',
      'Visitante',
      'CPF',
      'Empresa',
      'Observações',
      'Autorizado Por',
    ].join(',');

    const rows = logs.map(log => [
      new Date(log.timestamp).toLocaleString('pt-BR'),
      log.type === 'ENTRY' ? 'ENTRADA' : 'SAÍDA',
      log.visitor?.name || '',
      log.visitor?.cpf || '',
      log.visitor?.company || '',
      log.notes || '',
      log.authorizedBy || '',
    ].join(','));

    return [headers, ...rows].join('\n');
  };

  const generateJSON = () => {
    return JSON.stringify(
      {
        stats,
        logs: logs.map(log => ({
          timestamp: log.timestamp,
          type: log.type,
          visitor: {
            name: log.visitor?.name,
            cpf: log.visitor?.cpf,
            company: log.visitor?.company,
          },
          notes: log.notes,
          authorizedBy: log.authorizedBy,
        })),
        generatedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const handleExport = async () => {
    try {
      setExporting(true);

      let content = '';
      let filename = '';
      
      const timestamp = new Date().toISOString().split('T')[0];

      switch (format) {
        case 'csv':
          content = generateCSV();
          filename = `relatorio_${timestamp}.csv`;
          break;
        case 'json':
          content = generateJSON();
          filename = `relatorio_${timestamp}.json`;
          break;
        case 'pdf':
          Alert.alert(
            'Em Desenvolvimento',
            'Exportação para PDF estará disponível em breve!'
          );
          setExporting(false);
          return;
      }

      // Simular exportação (em produção, usar FileSystem do expo)
      console.log('Exportando arquivo:', filename);
      console.log('Conteúdo:', content.substring(0, 200) + '...');

      Alert.alert(
        'Exportação Concluída',
        `Relatório exportado como ${filename}\n\nTotal de ${logs.length} registros`
      );
    } catch (error) {
      console.error('Erro ao exportar:', error);
      Alert.alert('Erro', 'Não foi possível exportar o relatório');
    } finally {
      setExporting(false);
    }
  };

  const getFormatLabel = () => {
    switch (format) {
      case 'csv':
        return '📄 CSV';
      case 'json':
        return '📋 JSON';
      case 'pdf':
        return '📑 PDF';
    }
  };

  const getFormatColor = () => {
    switch (format) {
      case 'csv':
        return '#4CAF50';
      case 'json':
        return '#2196F3';
      case 'pdf':
        return '#F44336';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: getFormatColor() }]}
      onPress={handleExport}
      disabled={exporting || logs.length === 0}
    >
      {exporting ? (
        <ActivityIndicator size="small" color={getFormatColor()} />
      ) : (
        <>
          <Text style={[styles.buttonIcon, { color: getFormatColor() }]}>
            {getFormatLabel()}
          </Text>
          <Text style={styles.buttonLabel}>Exportar</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    minHeight: 60,
  },
  buttonIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
});
