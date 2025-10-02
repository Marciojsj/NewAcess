import { StyleSheet } from "react-native";
import { responsive } from "../utils/responsive";

const webSpecificStyles = {
  createButton: { 
    cursor: "pointer" as any, 
    transition: "all 0.2s ease" as any 
  },
  actionButton: { 
    cursor: "pointer" as any 
  },
  // Use boxShadow em vez de shadow props
  tableHeader: {
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)" as any,
  },
  tableRow: {
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)" as any,
  },
};

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  createButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    ...webSpecificStyles.createButton,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    ...webSpecificStyles.tableHeader,
  },
  headerCell: {
    flex: 1,
    fontWeight: "600",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    ...webSpecificStyles.tableRow,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  statusCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 14,
  },
  actionsCell: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    ...webSpecificStyles.actionButton,
  },
  editButton: {
    backgroundColor: "#ffc107",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});