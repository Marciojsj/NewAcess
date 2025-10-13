import { StyleSheet } from 'react-native';

// Note: Theme values are hardcoded for now, will be made dynamic later
const theme = {
  background: '#ffffff',
  backgroundCard: '#ffffff',
  backgroundSecondary: '#f3f4f6',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textInverse: '#ffffff',
  primary: '#6366f1',
  error: '#ef4444',
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
};
const isDark = false;

export const styles = StyleSheet.create({
  // Container Principal
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  
  content: {
    flex: 1,
    backgroundColor: theme.background,
  },
  
  // Header da Tela (Título + Botão Adicionar)
  screenHeader: {
    backgroundColor: theme.backgroundCard,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.text,
    letterSpacing: -0.5,
  },
  
  addButton: {
    backgroundColor: theme.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
  addButtonText: {
    color: theme.textInverse,
    fontWeight: '700',
    fontSize: 14,
  },
  
  // Busca
  searchContainer: {
    marginTop: 4,
  },
  
  searchInput: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.text,
  },
  
  // Lista
  listContainer: {
    flex: 1,
    backgroundColor: theme.background,
  },
  
  listHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: theme.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  
  listCount: {
    fontSize: 13,
    color: theme.textSecondary,
    fontWeight: '600',
  },
  
  listContent: {
    padding: 16,
  },
  
  // Card de Entidade (Mobile)
  entityCard: {
    backgroundColor: theme.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.borderLight,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
  
  // Empty State
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  
  emptyText: {
    fontSize: 56,
    marginBottom: 16,
    opacity: 0.3,
  },
  
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  emptySubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 300,
  },
  
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  
  modalContent: {
    backgroundColor: theme.backgroundCard,
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    maxHeight: '90%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
  },
  
  closeButton: {
    fontSize: 28,
    color: theme.textSecondary,
    fontWeight: '300',
    lineHeight: 28,
  },
  
  // Form
  formContainer: {
    padding: 20,
  },
  
  formGroup: {
    marginBottom: 16,
  },
  
  formLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
    marginBottom: 6,
  },
  
  formInput: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: theme.text,
  },
  
  radioGroup: {
    flexDirection: 'row',
    marginTop: 8,
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
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  radioCircleSelected: {
    borderColor: theme.primary,
  },
  
  radioCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.primary,
  },
  
  radioLabel: {
    fontSize: 15,
    color: theme.text,
  },
  
  formActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.borderLight,
    gap: 12,
  },
  
  formButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  cancelButton: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
  },
  
  saveButton: {
    backgroundColor: theme.primary,
    elevation: 2,
    shadowColor: theme.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  
  formButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.text,
  },
  
  saveButtonText: {
    color: theme.textInverse,
  },
  
  // Legacy compatibility styles
  homeWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  homeCard: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6,
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  homeSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 4,
    alignSelf: 'flex-start',
  },
  primaryButtonHover: {
    backgroundColor: '#0056d2',
  },
  primaryButtonPressed: {
    transform: [{ scale: 0.97 }],
    shadowOpacity: 0.2,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  // Additional legacy styles for compatibility
  listWrapper: {
    flex: 1,
    width: '100%',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  searchSection: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.backgroundCard,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 8,
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: 10,
    fontSize: 16,
    opacity: 0.4,
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: theme.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    flexWrap: 'wrap',
  },
  headerButton: {
    minWidth: 120,
  },
  headerButtonMobile: {
    width: '100%',
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.text,
  },
  loaderContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: theme.background,
  },
  loaderText: {
    marginTop: 12,
    fontSize: 14,
    color: theme.textSecondary,
  },
  scrollArea: {
    flex: 1,
    width: '100%',
  },
  listContentMobile: {
    flexDirection: 'column',
  },
  listContentDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  cardGrid: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardGridMobile: {
    flexDirection: 'column',
  },
  cardGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: theme.backgroundCard,
    borderWidth: 1,
    borderColor: theme.borderLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardHovered: {
    transform: [{ translateY: -2 }],
    shadowOpacity: 0.12,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  cardMobile: {
    width: '100%',
  },
  cardDesktop: {
    width: '48%',
    marginHorizontal: 4,
  },
  cardCode: {
    marginTop: 4,
    fontSize: 12,
    color: theme.textSecondary,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: theme.textSecondary,
    marginTop: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  metaItem: {
    flex: 1,
    minWidth: 100,
    marginTop: 6,
  },
  metaLabel: {
    fontSize: 11,
    color: theme.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  metaValue: {
    fontSize: 13,
    color: theme.text,
    fontWeight: '600',
    marginTop: 2,
  },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  detailsWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.background,
  },
  detailsHeader: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    flexWrap: 'wrap',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.text,
    marginLeft: 12,
    flex: 1,
  },
  detailsTitleMobile: {
    width: '100%',
    marginLeft: 0,
    marginTop: 12,
    textAlign: 'left',
  },
  detailsButton: {
    minWidth: 120,
  },
  detailsButtonMobile: {
    width: '100%',
    marginTop: 8,
  },
  detailsScroll: {
    flex: 1,
    width: '100%',
  },
  detailsContent: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: theme.backgroundCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.borderLight,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  detailsBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadgeLarge: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  statusTextLarge: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  detailsCode: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.text,
    marginBottom: 12,
  },
  sectionGrid: {
    marginTop: 8,
    flexDirection: 'column',
  },
  sectionDescription: {
    fontSize: 13,
    color: theme.textSecondary,
    lineHeight: 18,
    marginTop: 8,
  },
  detailItem: {
    marginBottom: 14,
  },
  detailItemLabel: {
    fontSize: 11,
    color: theme.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  detailItemValue: {
    fontSize: 14,
    color: theme.text,
    fontWeight: '600',
  },
  
  // Table styles for mobile (simplified)
  tableContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.background,
  },
  tableHeader: {
    display: 'none', // Hide table header on mobile
  },
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.primary,
  },
  tableRow: {
    backgroundColor: theme.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  rowClickable: {
    flex: 1,
    padding: 16,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  tableCellSmall: {
    flex: 1,
    paddingHorizontal: 4,
  },
  cellText: {
    fontSize: 13,
    color: theme.text,
  },
  actionsCell: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  menuButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
    borderWidth: 1,
    borderColor: theme.borderLight,
  },
  menuIcon: {
    fontSize: 18,
    color: theme.textSecondary,
    fontWeight: '700',
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: theme.backgroundCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.borderLight,
    minWidth: 140,
    right: 10,
    top: 40,
    zIndex: 9999,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.backgroundCard,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderLight,
  },
  dropdownItemDanger: {
    borderBottomWidth: 0,
  },
  dropdownIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownText: {
    fontSize: 13,
    color: theme.text,
    fontWeight: '600',
  },
  dropdownTextDanger: {
    color: theme.error,
  },
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: 'transparent',
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.4)',
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 50,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formRow: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  
  // Action Bar (para AppLayout)
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textInverse,
  },
});