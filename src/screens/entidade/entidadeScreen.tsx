import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Switch,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WebNavbar } from '../../components/layout/WebNavbar';
import { WebSidebar } from '../../components/layout/WebSidebar';
import { deviceType } from '../../utils/responsive';
import styles from './styles/entidadeScreen.styles';

// Tipos para os dados da entidade
interface Entidade {
  id: string;
  nome: string;
  razaoSocial: string;
  tipoPessoa: 'Física' | 'Jurídica';
  status: 'Ativo' | 'Inativo';
  indicadorIE: string;
  ultimaAtualizacao: string;
  comentarios: number;
  favorito: boolean;
  selecionado: boolean;
}

// Dados mockados baseados nas imagens
const mockEntidades: Entidade[] = [
  {
    id: '001',
    nome: 'Companhia Siderurgica Nacional',
    razaoSocial: 'COMPANHIA SIDERURGICA NACIONAL',
    tipoPessoa: 'Jurídica',
    status: 'Ativo',
    indicadorIE: 'Não Contribuinte',
    ultimaAtualizacao: '2 dias',
    comentarios: 3,
    favorito: true,
    selecionado: false,
  },
  {
    id: '002',
    nome: 'VILLARES METALS SA',
    razaoSocial: 'VILLARES METALS S.A.',
    tipoPessoa: 'Jurídica',
    status: 'Ativo',
    indicadorIE: 'Contribuinte',
    ultimaAtualizacao: '1 dia',
    comentarios: 1,
    favorito: false,
    selecionado: false,
  },
  {
    id: '003',
    nome: 'ARCELORMITTAL BRASIL S.A.',
    razaoSocial: 'ARCELORMITTAL BRASIL S.A.',
    tipoPessoa: 'Jurídica',
    status: 'Ativo',
    indicadorIE: 'Não Contribuinte',
    ultimaAtualizacao: '5 dias',
    comentarios: 0,
    favorito: true,
    selecionado: false,
  },
  {
    id: '004',
    nome: 'GERDAU S.A.',
    razaoSocial: 'GERDAU S.A.',
    tipoPessoa: 'Jurídica',
    status: 'Ativo',
    indicadorIE: 'Contribuinte',
    ultimaAtualizacao: '3 dias',
    comentarios: 2,
    favorito: false,
    selecionado: false,
  },
  {
    id: '005',
    nome: 'Banco Bradesco S.A.',
    razaoSocial: 'BANCO BRADESCO S.A.',
    tipoPessoa: 'Jurídica',
    status: 'Inativo',
    indicadorIE: 'Não Contribuinte',
    ultimaAtualizacao: '7 dias',
    comentarios: 0,
    favorito: false,
    selecionado: false,
  },
  {
    id: '006',
    nome: 'Itau Unibanco S.A.',
    razaoSocial: 'ITAU UNIBANCO S.A.',
    tipoPessoa: 'Jurídica',
    status: 'Ativo',
    indicadorIE: 'Contribuinte',
    ultimaAtualizacao: '1 dia',
    comentarios: 5,
    favorito: true,
    selecionado: false,
  },
];

export const EntidadeScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [entidades, setEntidades] = useState<Entidade[]>(mockEntidades);
  const [searchText, setSearchText] = useState('');
  const [filtroAtribuido, setFiltroAtribuido] = useState('');
  const [filtroCriadoPor, setFiltroCriadoPor] = useState('');
  const [filtroTag, setFiltroTag] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Função para alternar seleção individual
  const toggleSelecao = (id: string) => {
    setEntidades(prev => prev.map(entidade =>
      entidade.id === id 
        ? { ...entidade, selecionado: !entidade.selecionado }
        : entidade
    ));
  };

  // Função para selecionar/desselecionar todos
  const toggleSelecionarTodos = () => {
    const todosSelecionados = entidades.every(entidade => entidade.selecionado);
    setEntidades(prev => prev.map(entidade => ({
      ...entidade,
      selecionado: !todosSelecionados
    })));
  };

  // Função para alternar favorito
  const toggleFavorito = (id: string) => {
    setEntidades(prev => prev.map(entidade =>
      entidade.id === id 
        ? { ...entidade, favorito: !entidade.favorito }
        : entidade
    ));
  };

  // Função para adicionar nova entidade
  const handleAdicionarEntidade = () => {
    Alert.alert('Adicionar Entidade', 'Funcionalidade de adição será implementada');
  };

  // Função para aplicar filtros
  const aplicarFiltros = () => {
    Alert.alert('Filtros Aplicados', 'Filtros salvos com sucesso');
  };

  const handleViewModePress = () => {
    Alert.alert('Modo de Visualização', 'Alterar modo de visualização');
  };

  const handleActionsPress = () => {
    Alert.alert('Ações', 'Menu de ações disponíveis');
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Funcionalidade de logout será implementada');
  };

  // Renderizar cada item da lista
  const renderItem = ({ item }: { item: Entidade }) => (
    <View style={[styles.tableRow, { 
      backgroundColor: theme.backgroundCard,
      borderBottomColor: theme.borderLight 
    }]}>
      {/* Checkbox de seleção */}
      <View style={styles.cell}>
        <TouchableOpacity onPress={() => toggleSelecao(item.id)}>
          <View style={[
            styles.checkbox,
            { 
              borderColor: theme.primary,
              backgroundColor: item.selecionado ? theme.primary : 'transparent'
            }
          ]}>
            {item.selecionado && (
              <Text style={styles.checkboxText}>✓</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Nome */}
      <Text style={[styles.cell, { color: theme.text }]}>{item.nome}</Text>

      {/* Status */}
      <View style={styles.cell}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Ativo' ? theme.success : theme.error }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      {/* Razão Social */}
      <Text style={[styles.cell, { color: theme.text }]}>{item.razaoSocial}</Text>

      {/* Indicador de IE */}
      <Text style={[styles.cell, { color: theme.text }]}>{item.indicadorIE}</Text>

      {/* ID */}
      <Text style={[styles.cell, { color: theme.text }]}>{item.id}</Text>

      {/* Última atualização */}
      <Text style={[styles.cell, { color: theme.text }]}>{item.ultimaAtualizacao}</Text>

      {/* Ações - Comentários e Favoritos */}
      <View style={styles.actionsCell}>
        <TouchableOpacity style={styles.commentButton}>
          <Text style={[styles.commentText, { color: theme.textSecondary }]}>
            💬 {item.comentarios}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
          <Text style={[
            styles.favoriteIcon,
            { color: item.favorito ? theme.warning : theme.textSecondary }
          ]}>
            {item.favorito ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <WebNavbar
        screenName="Entidade"
        searchPlaceholder="Search or type a command (Ctrl + G)"
        viewModeLabel="Exibição em Lista"
        actionsLabel="Ações"
        addButtonLabel="+ Adicionar Entidade"
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddPress={handleAdicionarEntidade}
        onViewModePress={handleViewModePress}
        onActionsPress={handleActionsPress}
        onSidebarToggle={handleSidebarToggle}
      />

      {deviceType.isDesktop && (
        <WebSidebar
          isOpen={sidebarOpen}
          onToggle={handleSidebarToggle}
          theme={isDark ? 'dark' : 'light'}
          onThemeChange={toggleTheme}
          onLogout={handleLogout}
        />
      )}



      {/* Resto do código comentado permanece igual */}
    </View>
  );
};