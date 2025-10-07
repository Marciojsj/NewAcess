// src/screens/entidade/entidadeService.ts
import { StyleSheet, Platform } from 'react-native';
import { Theme } from '../../contexts/ThemeContext';
import { responsive, deviceType } from '../../utils/responsive';

// Interface da Entidade
export interface Entidade {
  id: string;
  nome: string;
  cnpj: string;
  tipo: 'Física' | 'Jurídica';
  endereco?: string;
  cidade?: string;
  estado?: string;
  email: string;
  telefone?: string;
  status: 'Ativo' | 'Inativo';
  createdAt: string;
  updatedAt: string;
}

// Dados mockados
let entidades: Entidade[] = [
  {
    id: '1',
    nome: 'Tech Solutions Ltda',
    cnpj: '12.345.678/0001-90',
    tipo: 'Jurídica',
    endereco: 'Av. Paulista, 1000',
    cidade: 'São Paulo',
    estado: 'SP',
    email: 'contato@techsolutions.com.br',
    telefone: '(11) 3456-7890',
    status: 'Ativo',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    nome: 'Indústria Metalúrgica Brasil S.A.',
    cnpj: '23.456.789/0001-01',
    tipo: 'Jurídica',
    endereco: 'Rua Industrial, 500',
    cidade: 'Belo Horizonte',
    estado: 'MG',
    email: 'contato@metalurgica.com.br',
    telefone: '(31) 2345-6789',
    status: 'Ativo',
    createdAt: '2024-01-10T08:30:00Z',
    updatedAt: '2024-02-20T14:15:00Z',
  },
  {
    id: '3',
    nome: 'Comércio ABC Ltda',
    cnpj: '34.567.890/0001-12',
    tipo: 'Jurídica',
    endereco: 'Rua do Comércio, 250',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    email: 'comercio@abc.com.br',
    telefone: '(21) 3456-7890',
    status: 'Ativo',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-02-01T09:00:00Z',
  },
  {
    id: '4',
    nome: 'João da Silva Transportes ME',
    cnpj: '123.456.789-00',
    tipo: 'Física',
    endereco: 'Av. Central, 150',
    cidade: 'Curitiba',
    estado: 'PR',
    email: 'joao.silva@transportes.com',
    telefone: '(41) 98765-4321',
    status: 'Ativo',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-03-10T16:30:00Z',
  },
  {
    id: '5',
    nome: 'Construtora Horizonte Ltda',
    cnpj: '45.678.901/0001-23',
    tipo: 'Jurídica',
    endereco: 'Rua das Obras, 789',
    cidade: 'Porto Alegre',
    estado: 'RS',
    email: 'contato@horizonte.com.br',
    telefone: '(51) 3210-9876',
    status: 'Inativo',
    createdAt: '2023-12-15T07:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
  {
    id: '6',
    nome: 'Maria Oliveira Consultoria',
    cnpj: '234.567.890-11',
    tipo: 'Física',
    endereco: 'SCS Quadra 1, Bloco A',
    cidade: 'Brasília',
    estado: 'DF',
    email: 'maria@consultoria.com',
    telefone: '(61) 99876-5432',
    status: 'Ativo',
    createdAt: '2024-02-10T13:00:00Z',
    updatedAt: '2024-02-10T13:00:00Z',
  },
  {
    id: '7',
    nome: 'Supermercado Bom Preço Ltda',
    cnpj: '56.789.012/0001-34',
    tipo: 'Jurídica',
    endereco: 'Av. dos Supermercados, 100',
    cidade: 'Salvador',
    estado: 'BA',
    email: 'contato@bompreco.com.br',
    telefone: '(71) 3344-5566',
    status: 'Ativo',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-02-15T12:00:00Z',
  },
  {
    id: '8',
    nome: 'Farmácia Saúde & Vida',
    cnpj: '67.890.123/0001-45',
    tipo: 'Jurídica',
    endereco: 'Rua da Saúde, 50',
    cidade: 'Recife',
    estado: 'PE',
    email: 'contato@saudevida.com.br',
    telefone: '(81) 3222-1111',
    status: 'Ativo',
    createdAt: '2024-02-20T10:30:00Z',
    updatedAt: '2024-02-20T10:30:00Z',
  },
];

// Funções CRUD
export const getAll = (): Entidade[] => {
  return [...entidades];
};

export const getById = (id: string): Entidade | undefined => {
  return entidades.find((e) => e.id === id);
};

export const create = (entidade: Omit<Entidade, 'id' | 'createdAt' | 'updatedAt'>): Entidade => {
  const newEntidade: Entidade = {
    ...entidade,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  entidades.push(newEntidade);
  return newEntidade;
};

export const update = (id: string, data: Partial<Entidade>): Entidade | null => {
  const index = entidades.findIndex((e) => e.id === id);
  if (index === -1) return null;

  entidades[index] = {
    ...entidades[index],
    ...data,
    id: entidades[index].id, // Mantém o ID original
    updatedAt: new Date().toISOString(),
  };
  return entidades[index];
};

export const deleteEntidade = (id: string): boolean => {
  const index = entidades.findIndex((e) => e.id === id);
  if (index === -1) return false;

  entidades.splice(index, 1);
  return true;
};

export const search = (term: string): Entidade[] => {
  const normalized = term.toLowerCase().trim();
  if (!normalized) return [...entidades];

  return entidades.filter(
    (e) =>
      e.nome.toLowerCase().includes(normalized) ||
      e.cnpj.includes(normalized) ||
      e.email.toLowerCase().includes(normalized) ||
      e.cidade?.toLowerCase().includes(normalized) ||
      e.estado?.toLowerCase().includes(normalized)
  );
};

export const filterByStatus = (status: 'Ativo' | 'Inativo'): Entidade[] => {
  return entidades.filter((e) => e.status === status);
};

export const filterByType = (tipo: 'Física' | 'Jurídica'): Entidade[] => {
  return entidades.filter((e) => e.tipo === tipo);
};

export const getStats = () => {
  const total = entidades.length;
  const ativas = entidades.filter((e) => e.status === 'Ativo').length;
  const inativas = entidades.filter((e) => e.status === 'Inativo').length;
  const juridicas = entidades.filter((e) => e.tipo === 'Jurídica').length;
  const fisicas = entidades.filter((e) => e.tipo === 'Física').length;

  return {
    total,
    ativas,
    inativas,
    juridicas,
    fisicas,
  };
};

// Estilos
export const createStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      overflow: 'visible',
    },
    
    content: {
      flex: 1,
      backgroundColor: theme.background,
      overflow: 'visible',
      ...Platform.select({
        web: {
          width: '100%',
          maxWidth: '100%',
        },
      }),
    },
    
    // Mobile Header
    mobileHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: responsive.padding.lg,
      paddingVertical: responsive.padding.md,
      backgroundColor: theme.backgroundCard,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    
    mobileTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: theme.text,
    },
    
    addButton: {
      backgroundColor: theme.primary,
      paddingHorizontal: responsive.padding.lg,
      paddingVertical: responsive.padding.sm,
      borderRadius: 8,
    },
    
    addButtonText: {
      color: theme.textInverse,
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
    },
    
    // Search
    searchContainer: {
      paddingHorizontal: responsive.padding.lg,
      paddingVertical: responsive.padding.md,
      backgroundColor: theme.backgroundCard,
    },
    
    searchInput: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: responsive.padding.md,
      paddingVertical: responsive.padding.sm,
      fontSize: responsive.fontSize.md,
      color: theme.text,
    },
    
    // List
    listContainer: {
      flex: 1,
      backgroundColor: theme.backgroundCard,
      overflow: 'visible',
    },
    
    listHeader: {
      paddingHorizontal: responsive.padding.lg,
      paddingVertical: responsive.padding.md,
      backgroundColor: theme.backgroundCard,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    
    listCount: {
      fontSize: responsive.fontSize.sm,
      color: theme.textSecondary,
      fontWeight: '600',
    },
    
    tableContainer: {
      flex: 1,
      minWidth: '100%',
      backgroundColor: theme.backgroundCard,
      overflow: 'visible',
      ...Platform.select({
        web: {
          width: '100%',
        },
        default: {
          minWidth: 900,
        },
      }),
    },
    
    // Table Header
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: isDark ? theme.backgroundSecondary : theme.backgroundCard,
      borderBottomWidth: 2,
      borderBottomColor: theme.primary,
      paddingVertical: responsive.padding.md,
      paddingHorizontal: responsive.padding.md,
      width: '100%',
      ...Platform.select({
        web: {
          position: 'sticky' as any,
          top: 0,
          zIndex: 10,
        },
      }),
    },
    
    headerText: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '700',
      color: theme.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    
        // Table Row
    tableRow: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundCard,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
      alignItems: 'center',
      minHeight: 56,
      width: '100%',
      overflow: 'visible',
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        },
      }),
    },
    
    rowClickable: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsive.padding.md,
      paddingHorizontal: responsive.padding.md,
      overflow: 'visible',
      ...Platform.select({
        web: {
          ':hover': {
            backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
          },
        },
      }),
    },
    
    tableCell: {
      flex: 2,
      paddingHorizontal: responsive.padding.sm,
      justifyContent: 'center',
    },
    
    tableCellSmall: {
      flex: 1,
      paddingHorizontal: responsive.padding.sm,
      justifyContent: 'center',
    },
    
    cellText: {
      fontSize: responsive.fontSize.sm,
      color: theme.text,
      lineHeight: 20,
    },
    
    statusBadge: {
      paddingHorizontal: responsive.padding.md,
      paddingVertical: 6,
      borderRadius: 12,
      alignSelf: 'flex-start',
      minWidth: 70,
      alignItems: 'center',
    },
    
    statusActive: {
      backgroundColor: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.3)',
    },
    
    statusInactive: {
      backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.15)',
      borderWidth: 1,
      borderColor: isDark ? 'rgba(239, 68, 68, 0.5)' : 'rgba(239, 68, 68, 0.3)',
    },
    
    statusText: {
      fontSize: responsive.fontSize.xs,
      fontWeight: '700',
      color: isDark ? theme.text : '#000',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    
    // Actions Menu
    actionsCell: {
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingHorizontal: responsive.padding.sm,
      zIndex: 9999,
    },
    
    menuButton: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      borderWidth: 1,
      borderColor: theme.borderLight,
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          ':hover': {
            backgroundColor: isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)',
            borderColor: theme.primary,
          },
        },
      }),
    },
    
    menuIcon: {
      fontSize: 20,
      color: theme.textSecondary,
      fontWeight: '700',
      lineHeight: 20,
    },
    
    dropdownMenu: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: isDark ? 'rgba(99, 102, 241, 0.5)' : theme.borderLight,
      minWidth: 160,
      maxWidth: 200,
      zIndex: 999999,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
        },
        android: {
          elevation: 999,
        },
        web: {
          boxShadow: isDark 
            ? '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(99, 102, 241, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(0, 0, 0, 0.1)',
        },
      }),
    },
    
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsive.padding.md,
      paddingHorizontal: responsive.padding.lg,
      backgroundColor: theme.backgroundCard,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
      ...Platform.select({
        web: {
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          ':hover': {
            backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)',
          },
        },
      }),
    },
    
    dropdownItemDanger: {
      borderBottomWidth: 0,
      ...Platform.select({
        web: {
          ':hover': {
            backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.05)',
          },
        },
      }),
    },
    
    dropdownIcon: {
      fontSize: 18,
      marginRight: responsive.spacing.sm,
    },
    
    dropdownText: {
      fontSize: responsive.fontSize.sm,
      color: theme.text,
      fontWeight: '600',
    },
    
    dropdownTextDanger: {
      color: theme.error,
    },
    
    menuOverlay: {
      ...Platform.select({
        web: {
          position: 'fixed' as any,
        },
        default: {
          position: 'absolute',
        },
      }),
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      backgroundColor: 'transparent',
    },
    
    blurOverlay: {
      ...Platform.select({
        web: {
          position: 'fixed' as any,
        },
        default: {
          position: 'absolute',
        },
      }),
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)',
    },
    
    // Empty State
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: responsive.padding.xl * 3,
      paddingHorizontal: responsive.padding.xl,
      minHeight: 300,
    },
    
    emptyText: {
      fontSize: 72,
      marginBottom: responsive.spacing.lg,
      opacity: 0.5,
    },
    
    emptyTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: theme.text,
      marginBottom: responsive.spacing.sm,
      textAlign: 'center',
    },
    
    emptySubtitle: {
      fontSize: responsive.fontSize.md,
      color: theme.textSecondary,
      textAlign: 'center',
      maxWidth: 400,
    },
    
    // Modal
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: responsive.padding.lg,
    },
    
    modalContent: {
      backgroundColor: theme.backgroundCard,
      borderRadius: 16,
      width: '100%',
      maxWidth: deviceType.isDesktop ? 600 : '100%',
      maxHeight: '90%',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
        },
        android: {
          elevation: 8,
        },
        web: {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        },
      }),
    },
    
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: responsive.padding.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderLight,
    },
    
    modalTitle: {
      fontSize: responsive.fontSize.xl,
      fontWeight: '700',
      color: theme.text,
    },
    
    closeButton: {
      fontSize: responsive.fontSize.xxl,
      color: theme.textSecondary,
      fontWeight: '300',
    },
    
    // Form
    formContainer: {
      padding: responsive.padding.lg,
    },
    
    formGroup: {
      marginBottom: responsive.spacing.md,
    },
    
    formRow: {
      flexDirection: 'row',
      marginBottom: responsive.spacing.md,
    },
    
    formLabel: {
      fontSize: responsive.fontSize.sm,
      fontWeight: '600',
      color: theme.textSecondary,
      marginBottom: responsive.spacing.xs,
    },
    
    formInput: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: responsive.padding.md,
      paddingVertical: responsive.padding.sm,
      fontSize: responsive.fontSize.md,
      color: theme.text,
    },
    
    radioGroup: {
      flexDirection: 'row',
      marginTop: responsive.spacing.xs,
    },
    
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: responsive.spacing.lg,
    },
    
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.border,
      marginRight: responsive.spacing.xs,
    },
    
    radioCircleSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary,
    },
    
    radioLabel: {
      fontSize: responsive.fontSize.md,
      color: theme.text,
    },
    
    formActions: {
      flexDirection: 'row',
      padding: responsive.padding.lg,
      borderTopWidth: 1,
      borderTopColor: theme.borderLight,
      gap: responsive.spacing.md,
    },
    
    formButton: {
      flex: 1,
      paddingVertical: responsive.padding.md,
      borderRadius: 8,
      alignItems: 'center',
    },
    
    cancelButton: {
      backgroundColor: theme.backgroundSecondary,
      borderWidth: 1,
      borderColor: theme.border,
    },
    
    saveButton: {
      backgroundColor: theme.primary,
    },
    
    formButtonText: {
      fontSize: responsive.fontSize.md,
      fontWeight: '600',
      color: theme.text,
    },
    
    saveButtonText: {
      color: theme.textInverse,
    },
  });
