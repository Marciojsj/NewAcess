import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    flex: 2,
    paddingHorizontal: 20,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  breadcrumb: {
    fontSize: 14,
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
    width: '100%',
  },
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    cursor: 'pointer',
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    cursor: 'pointer',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 280,
    padding: 20,
    borderRightWidth: 1,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  filterInput: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 14,
    width: '100%',
  },
  saveFilterButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    cursor: 'pointer',
  },
  saveFilterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tableArea: {
    flex: 1,
    padding: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  tableList: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkboxText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  actionsCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commentButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    cursor: 'pointer',
  },
  commentText: {
    fontSize: 12,
  },
  favoriteIcon: {
    fontSize: 18,
    cursor: 'pointer',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    cursor: 'pointer',
  },
  pageButtonText: {
    fontSize: 14,
  },
  pageInfo: {
    fontSize: 14,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
    height: 40,
  },
  
});