// src/screens/entidade/styles/EntidadeScreen.styles.web.ts
import { StyleSheet, Platform, ViewStyle } from 'react-native';
import { Theme } from '../../../contexts/ThemeContext';

export const createStyles = (theme: Theme, isDark: boolean) => StyleSheet.create({
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
  
  // Screen Header (título + busca + botão) - Layout compacto e minimalista
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: theme.background,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 100,
      },
    }),
  },
  
  screenTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.text,
    letterSpacing: -0.3,
    minWidth: 100,
    left: 70,
    marginTop: 8,
  },
  
  // Container para agrupar busca e botão lado a lado
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  
  addButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
  },
  
  addButtonText: {
    color: theme.textInverse,
    fontWeight: '600',
    fontSize: 14,
  },
  
  // Search/Filter - Layout compacto integrado
  searchContainer: {
    position: 'relative',
    width: 300,
    ...Platform.select({
      web: {
        minWidth: 250,
      },
      default: {
        width: 200,
      },
    }),
  },
  
  searchInput: {
    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
    borderWidth: 1,
    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 40,
    fontSize: 14,
    color: theme.text,
  },
  
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    fontSize: 16,
    opacity: 0.4,
    ...Platform.select({
      web: {
        transform: 'translateY(-50%)',
      },
      default: {
        top: 8,
      },
    }),
  },
  
  // List
  listContainer: {
    flex: 1,
    backgroundColor: theme.background,
    overflow: 'visible',
  },
  
  listHeader: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: theme.background,
  },
  
  listCount: {
    fontSize: 14,
    color: theme.textSecondary,
    fontWeight: '600',
    opacity: 0.7,
  },
  
  listContent: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'flex-start',
  },
  
  // Grid Layout for Cards - Espaçamento proporcional
  cardWrapper: {
    width: 'calc(33.333% - 14px)' as any, // 3 colunas com gap de 20px: (20 * 2) / 3 = ~14px
    minWidth: 340,
    maxWidth: 480,
    flexGrow: 0,
    flexShrink: 0,
  },
  
  // Card de Entidade (Web - matching mobile)
  entityCard: {
    backgroundColor: theme.backgroundCard,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 } as { width: number; height: number },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    height: '100%',
    width: '100%',
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  
  cardHeaderInfo: {
    flex: 1,
    marginRight: 12,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 4,
  },
  
  cardSubtitle: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  
  // Status Badge
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    minWidth: 60,
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
    fontSize: 11,
    fontWeight: '700',
    color: theme.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  // Detalhes do Card
  cardDetails: {
    marginTop: 8,
  },
  
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
  },
  
  detailRowLast: {
    borderBottomWidth: 0,
  },
  
  detailLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  
  detailValue: {
    fontSize: 13,
    color: theme.text,
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  
  // Menu de Ações
  cardActions: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.borderLight,
    gap: 8,
  },
  
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  
  editButton: {
    backgroundColor: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)',
    borderColor: theme.primary,
  },
  
  deleteButton: {
    backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
    borderColor: theme.error,
  },
  
  actionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  
  actionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  
  editText: {
    color: theme.primary,
  },
  
  deleteText: {
    color: theme.error,
  },
  
  // OLD: Table Styles (deprecated - kept for backward compatibility)
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
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    fontSize: 14,
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
  },
  
  rowClickable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    overflow: 'visible',
  },
  
  tableCell: {
    flex: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  
  tableCellSmall: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  
  cellText: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
  },
  
  // OLD statusBadge/statusActive/statusInactive/statusText removed (using new card versions above)
  
  // Actions Menu
  actionsCell: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 8,
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
    paddingVertical: 16,
    paddingHorizontal: 24,
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
    marginRight: 8,
  },
  
  dropdownText: {
    fontSize: 14,
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
    paddingVertical: 96,
    paddingHorizontal: 32,
    minHeight: 300,
  },
  
  emptyText: {
    fontSize: 72,
    marginBottom: 24,
    opacity: 0.5,
  },
  
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  emptySubtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    textAlign: 'center',
    maxWidth: 400,
  },
  
  // Overlays
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 50,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(2px)',
      },
    }),
  },
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  
  modalContent: {
    backgroundColor: theme.backgroundCard,
    borderRadius: 16,
    width: '100%',
    maxWidth: 600,
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
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
  },
  
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        ':hover': {
          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        },
      },
    }),
  },
  
  closeButtonText: {
    fontSize: 24,
    color: theme.textSecondary,
    fontWeight: '300',
  },
  
  // Form
  formScroll: {
    flex: 1,
    padding: 24,
  },
  
  formContainer: {
    padding: 24,
  },
  
  formGroup: {
    marginBottom: 16,
  },
  
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textSecondary,
    marginBottom: 4,
  },
  
  formInput: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    color: theme.text,
  },
  
  radioGroup: {
    flexDirection: 'row',
    marginTop: 4,
  },
  
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.border,
    marginRight: 4,
  },
  
  radioCircleSelected: {
    borderColor: theme.primary,
    backgroundColor: theme.primary,
  },
  
  radioLabel: {
    fontSize: 16,
    color: theme.text,
  },
  
  modalFooter: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: theme.borderLight,
    gap: 16,
  },
  
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': {
          transform: 'scale(1.02)',
        },
      },
    }),
  },
  
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.textInverse,
  },
  
  formActions: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: theme.borderLight,
    gap: 16,
  },
  
  formButton: {
    flex: 1,
    paddingVertical: 16,
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
    fontSize: 16,
    fontWeight: '600',
    color: theme.text,
  },
  
  // Note: All legacy/duplicate card and list styles removed
  // Current active styles are defined above with grid layout support
});

export default createStyles;