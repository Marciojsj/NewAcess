import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  searchSection: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  searchInput: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContent: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  listContentMobile: {
    flexDirection: 'column',
  },
  listContentDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
  },
  card: {
    width: 320,
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 3,
    minHeight: 200,
  },
  cardMobile: {
    width: '100%',
  },
  cardDesktop: {
    flexGrow: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cardHeaderInfo: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    overflow: 'hidden',
  },
  cardSubtitle: {
    fontSize: 14,
    marginTop: 4,
    overflow: 'hidden',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  metaItem: {
    flex: 1,
    minWidth: 140,
    marginTop: 8,
  },
  metaLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '500',
    overflow: 'hidden',
  },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 360,
  },
});