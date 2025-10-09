/**
 * Visitor Photo Upload Component
 * Componente para upload de foto do visitante
 */

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface VisitorPhotoUploadProps {
  visitorId: string;
  onPhotoSelected: (photoUri: string) => void;
}

export const VisitorPhotoUpload: React.FC<VisitorPhotoUploadProps> = ({
  visitorId,
  onPhotoSelected,
}) => {
  const [uploading, setUploading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de permissão para acessar suas fotos.'
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos de permissão para acessar a câmera.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        handleImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível tirar a foto');
    }
  };

  const handleImageSelected = async (uri: string) => {
    setUploading(true);
    try {
      // Aqui você pode implementar upload para um servidor
      // Por enquanto, apenas passa a URI local
      onPhotoSelected(uri);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const showOptions = () => {
    Alert.alert(
      'Selecionar Foto',
      'Escolha uma opção:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Tirar Foto', onPress: takePhoto },
        { text: 'Escolher da Galeria', onPress: pickImage },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={showOptions}
        disabled={uploading}
      >
        <Text style={styles.uploadIcon}>
          {uploading ? '⏳' : '📷'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  uploadButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  uploadIcon: {
    fontSize: 16,
    color: '#fff',
  },
});