/**
 * QR Code Display Component
 * Exibe o QR Code do visitante
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Visitor } from '../../types/visitorTypes';

interface QRCodeDisplayProps {
  visible: boolean;
  visitor: Visitor | null;
  onClose: () => void;
  onRegenerate?: () => void;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  visible,
  visitor,
  onClose,
  onRegenerate,
}) => {
  if (!visitor) {
    return null;
  }

  const isExpired = visitor.qrCodeExpiry
    ? new Date(visitor.qrCodeExpiry) < new Date()
    : false;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>QR Code do Visitante</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Informações do Visitante */}
            <View style={styles.visitorInfo}>
              <Text style={styles.visitorName}>{visitor.name}</Text>
              {visitor.company && (
                <Text style={styles.visitorCompany}>{visitor.company}</Text>
              )}
              <Text style={styles.visitorCpf}>CPF: {visitor.cpf}</Text>
            </View>

            {/* QR Code */}
            <View style={styles.qrCodeContainer}>
              {visitor.qrCode ? (
                <>
                  <Image
                    source={{ uri: visitor.qrCode }}
                    style={styles.qrCodeImage}
                    resizeMode="contain"
                  />
                  
                  {/* Status de Validade */}
                  <View
                    style={[
                      styles.validityBadge,
                      isExpired ? styles.expiredBadge : styles.validBadge,
                    ]}
                  >
                    <Text style={styles.validityText}>
                      {isExpired ? '⚠️ Expirado' : '✓ Válido'}
                    </Text>
                  </View>

                  {/* Data de Expiração */}
                  {visitor.qrCodeExpiry && (
                    <Text style={styles.expiryText}>
                      {isExpired ? 'Expirou em:' : 'Válido até:'}{' '}
                      {formatDate(visitor.qrCodeExpiry)}
                    </Text>
                  )}
                </>
              ) : (
                <View style={styles.noQrCode}>
                  <Text style={styles.noQrCodeIcon}>📱</Text>
                  <Text style={styles.noQrCodeText}>
                    QR Code não disponível
                  </Text>
                </View>
              )}
            </View>

            {/* Instruções */}
            <View style={styles.instructions}>
              <Text style={styles.instructionsTitle}>ℹ️ Como usar:</Text>
              <Text style={styles.instructionsText}>
                1. Mostre este QR Code ao chegar{'\n'}
                2. O sistema fará o scan automaticamente{'\n'}
                3. Sua entrada será registrada
              </Text>
            </View>

            {/* Botões */}
            <View style={styles.buttonContainer}>
              {onRegenerate && (
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.regenerateButton,
                    isExpired && styles.regenerateButtonPrimary,
                  ]}
                  onPress={onRegenerate}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      isExpired && styles.regenerateButtonTextPrimary,
                    ]}
                  >
                    {isExpired ? '🔄 Gerar Novo QR Code' : '🔄 Renovar'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.button, styles.closeButtonBottom]}
                onPress={onClose}
              >
                <Text style={styles.closeButtonBottomText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  visitorInfo: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  visitorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  visitorCompany: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  visitorCpf: {
    fontSize: 14,
    color: '#999',
  },
  qrCodeContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  qrCodeImage: {
    width: 250,
    height: 250,
    marginBottom: 16,
  },
  noQrCode: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noQrCodeIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  noQrCodeText: {
    fontSize: 16,
    color: '#999',
  },
  validityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  validBadge: {
    backgroundColor: '#D4EDDA',
  },
  expiredBadge: {
    backgroundColor: '#F8D7DA',
  },
  validityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  expiryText: {
    fontSize: 14,
    color: '#666',
  },
  instructions: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  regenerateButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  regenerateButtonPrimary: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  regenerateButtonTextPrimary: {
    color: '#FFF',
  },
  closeButtonBottom: {
    backgroundColor: '#6C757D',
  },
  closeButtonBottomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
