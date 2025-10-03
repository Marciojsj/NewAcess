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
import { Platform } from 'react-native';
import styles from './styles/entidadeScreen.styles';
import { MobileSidebar } from '../../components/layout/MobileSidebar';
import MobileNavbar from "../../components/layout/MobileNavbar";


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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  const handleMobileMenuToggle = (isOpen: boolean) => {
    setMobileSidebarOpen(isOpen);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {Platform.OS === 'web' && (
        <WebNavbar
          screenName="Entidade"
          searchPlaceholder="Search or type a command (Ctrl + G)"
          viewModeLabel={Platform.OS === 'web' ? "Exibição em Lista" : " + "}
          addButtonLabel={Platform.OS === 'web' ? "+ Adicionar Entidade" : " + "}
          searchText={searchText}
          onSearchChange={setSearchText}
          onAddPress={handleAdicionarEntidade}
          onViewModePress={handleViewModePress}
          onActionsPress={handleActionsPress}
          onSidebarToggle={handleSidebarToggle}
        />
      )}

      {Platform.OS === 'web' && (
        <WebSidebar
          isOpen={sidebarOpen}
          onToggle={handleSidebarToggle}
          theme={isDark ? 'dark' : 'light'}
          onThemeChange={toggleTheme}
          onLogout={handleLogout}
        />
      )}

      {/* // No entidadeScreen.tsx, ajuste as props do MobileNavbar */}
      {Platform.OS !== 'web' && (
        <MobileNavbar
          screenName="Entidade"
          visible={true}
          onMenuToggle={handleMobileMenuToggle}
          onAddPress={handleAdicionarEntidade}
          addButtonLabel="+"
          searchPlaceholder="Buscar entidades..."
          searchText={searchText}
          onSearchChange={setSearchText}
        />
      )}

      {Platform.OS !== 'web' && (
        <MobileSidebar
          visible={true}
          onMenuToggle={handleMobileMenuToggle}
          onThemeChange={toggleTheme}
          onLogout={handleLogout}
        />
      )}





      {/* Resto do código comentado permanece igual */}
    </View>
  );
};