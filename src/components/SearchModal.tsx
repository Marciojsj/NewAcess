// src/components/SearchModal.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Animated,
  Platform,
  Keyboard,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { responsive } from '../utils/responsive';

interface SearchableItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  keywords: string[];
  onPress: () => void;
}

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  searchData: SearchableItem[];
  autoFocus?: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

export const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  onClose,
  theme,
  searchData,
  autoFocus = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<SearchableItem[]>(searchData);
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 20,
        stiffness: 90,
        useNativeDriver: true,
      }).start();
      
      if (autoFocus) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    } else {
      Animated.spring(slideAnim, {
        toValue: screenHeight,
        damping: 20,
        stiffness: 90,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(searchData);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.keywords.some((keyword: string) => keyword.toLowerCase().includes(query)) // TIPAGEM CORRIGIDA
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, searchData]);

  const handleItemPress = (item: SearchableItem) => {
    Keyboard.dismiss(); // Fecha teclado ao selecionar item
    onClose();
    setTimeout(() => item.onPress(), 300);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <Text key={index} style={styles.highlightedText}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  const renderItem = ({ item }: { item: SearchableItem }) => (
    <TouchableOpacity
      style={[
        styles.resultItem,
        {
          backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        }
      ]}
      onPress={() => handleItemPress(item)}
    >
      <View style={[styles.resultIcon, { backgroundColor: item.color }]}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <View style={styles.resultText}>
        <Text style={[
          styles.resultTitle,
          { color: theme === 'dark' ? '#ffffff' : '#1e293b' }
        ]}>
          {highlightText(item.title, searchQuery)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleClose = () => {
    Keyboard.dismiss(); // Fecha teclado ao fechar modal
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleClose} // Fecha modal e teclado ao clicar fora
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={(e) => e.stopPropagation()} // Impede fechamento ao clicar no conteúdo
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={[
                styles.modalTitle,
                { color: theme === 'dark' ? '#ffffff' : '#1e293b' }
              ]}>
                Buscar
              </Text>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  { backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }
                ]}
                onPress={handleClose}
              >
                <Text style={[
                  styles.closeIcon,
                  { color: theme === 'dark' ? '#ffffff' : '#1e293b' }
                ]}>
                  ✕
                </Text>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={[
              styles.searchContainer,
              {
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              }
            ]}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                ref={inputRef}
                style={[
                  styles.searchInput,
                  {
                    color: theme === 'dark' ? '#ffffff' : '#1e293b',
                  }
                ]}
                placeholder="Buscar páginas..."
                placeholderTextColor={theme === 'dark' ? '#94a3b8' : '#9ca3af'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                autoFocus={autoFocus}
                onSubmitEditing={Keyboard.dismiss} // Fecha teclado ao pressionar Enter
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={[
                    styles.clearIcon,
                    { color: theme === 'dark' ? '#94a3b8' : '#9ca3af' }
                  ]}>
                    ✕
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Results */}
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.resultsList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={[
                    styles.emptyText,
                    { color: theme === 'dark' ? '#64748b' : '#94a3b8' }
                  ]}>
                    {searchQuery ? 'Nenhum resultado encontrado' : 'Digite para buscar'}
                  </Text>
                </View>
              }
            />

            {/* Footer */}
            <View style={[
              styles.modalFooter,
              { borderTopColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
            ]}>
              <Text style={[
                styles.footerText,
                { color: theme === 'dark' ? '#64748b' : '#94a3b8' }
              ]}>
                {filteredData.length} itens encontrados
              </Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 20,
    overflow: 'hidden',
    maxHeight: screenHeight * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: responsive.fontSize.lg,
    fontWeight: '600',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: responsive.padding.lg,
    paddingHorizontal: responsive.padding.md,
    paddingVertical: responsive.padding.sm,
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: responsive.spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: responsive.fontSize.md,
    paddingVertical: responsive.padding.sm,
  },
  clearIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 4,
  },
  resultsList: {
    flex: 1,
    maxHeight: 400,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsive.padding.md,
    paddingHorizontal: responsive.padding.lg,
    marginHorizontal: responsive.padding.md,
    marginBottom: responsive.spacing.xs,
    borderRadius: 12,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsive.spacing.md,
  },
  iconText: {
    fontSize: 16,
  },
  resultText: {
    flex: 1,
  },
  resultTitle: {
    fontSize: responsive.fontSize.md,
    fontWeight: '500',
  },
  highlightedText: {
    backgroundColor: '#f59e0b',
    color: '#000',
    fontWeight: 'bold',
    borderRadius: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsive.padding.xl,
  },
  emptyText: {
    fontSize: responsive.fontSize.md,
    textAlign: 'center',
  },
  modalFooter: {
    paddingHorizontal: responsive.padding.lg,
    paddingVertical: responsive.padding.md,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: responsive.fontSize.sm,
    textAlign: 'center',
  },
});