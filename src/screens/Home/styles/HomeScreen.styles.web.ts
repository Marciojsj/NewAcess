// src/screens/Home/styles/HomeScreen.styles.web.ts
import { StyleSheet, Dimensions } from "react-native";
import { responsive, deviceType } from "../../../utils/responsive";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const webSpecificStyles = {
  container: {
    minHeight: "100vh" as any,
    // background será definido via theme
  },
  quickActionButton: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" as any,
    cursor: "pointer" as any,
    "&:hover": {
      transform: "translateY(-4px) scale(1.05)" as any,
      boxShadow: "0 12px 30px rgba(0,0,0,0.4)" as any
    }
  },
  serviceCard: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" as any,
    cursor: "pointer" as any,
    "&:hover": {
      transform: "translateY(-5px) scale(1.02)" as any,
      boxShadow: "0 10px 25px rgba(0,0,0,0.5)" as any
    }
  },
  profileButton: {
    cursor: "pointer" as any,
    transition: "all 0.2s ease" as any,
    "&:hover": {
      // backgroundColor será definido via theme
      transform: "scale(1.1)" as any
    }
  }
};

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor será definido via theme
    ...webSpecificStyles.container
  },
  scrollContent: {
    paddingBottom: responsive.padding.xl,
    minHeight: screenHeight
  },
  scrollContentDesktop: {
    paddingHorizontal: 0
  },
  backgroundCircle: {
    position: 'absolute' as const,
    borderRadius: 999,
    borderWidth: 2,
    // borderColor será definido via theme
  },
  circle1: {
    width: 700,
    height: 700,
    top: -250,
    left: -180
  },
  circle2: {
    width: 900,
    height: 900,
    top: '35%',
    right: -350
  },
  header: {
    paddingHorizontal: responsive.padding.xl,
    paddingTop: responsive.padding.xl,
    paddingBottom: responsive.padding.lg
  },
  headerDesktop: {
    paddingTop: responsive.padding.xl * 1.5,
    paddingBottom: responsive.padding.xl
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start' as const,
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    marginBottom: responsive.spacing.md
  },
  greetingContainer: {
    flex: 1
  },
  greeting: {
    fontSize: 36,
    fontWeight: '700' as const,
    // color será definido via theme
    marginBottom: 6,
    letterSpacing: -0.5
  },
  greetingDesktop: {
    fontSize: 42
  },
  accountType: {
    fontSize: 15,
    // color será definido via theme
    fontWeight: '400' as const,
    letterSpacing: 0.3
  },
  accountTypeDesktop: {
    fontSize: 17
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // backgroundColor será definido via theme
    justifyContent: 'center',
    alignItems: 'center',
    ...webSpecificStyles.profileButton
  },
  profileIcon: {
    fontSize: 20
  },
  quickActionsContainer: {
    marginVertical: responsive.spacing.xl
  },
  quickActionsContainerDesktop: {
    marginVertical: responsive.spacing.xl,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: responsive.padding.xl
  },
  quickActionsScroll: {
    paddingHorizontal: responsive.padding.xl,
    justifyContent: 'center',
    flexGrow: 1
  },
  quickActionButton: {
    width: 110,
    height: 110,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000', // Mantido como está
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    marginHorizontal: responsive.spacing.md,
    ...webSpecificStyles.quickActionButton
  },
  quickActionIcon: {
    fontSize: 36,
    marginBottom: 8
  },
  quickActionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#fff', // Mantido para contrastar com gradientes
    textAlign: 'center',
    letterSpacing: 0.2
  },
  serviceCardsContainer: {
    marginBottom: responsive.spacing.xl,
    maxWidth: 1400,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: responsive.padding.xl
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600' as const,
    // color será definido via theme
    marginBottom: responsive.spacing.lg,
    letterSpacing: 0.3
  },
  sectionTitleDesktop: {
    fontSize: 24,
    marginBottom: responsive.spacing.xl
  },
  serviceCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-start',
    gap: 16,
    alignItems: 'stretch' as const
  },
  serviceCard: {
    borderRadius: 20,
    padding: 22,
    elevation: 6,
    shadowColor: '#000', // Mantido como está
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    minWidth: 260,
    maxWidth: 320,
    minHeight: 140,
    flex: 1,
    justifyContent: 'space-between' as const,
    ...webSpecificStyles.serviceCard
  },
  serviceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start' as const,
    marginBottom: 12
  },
  serviceCardIcon: {
    fontSize: 26
  },
  serviceCardSubtitle: {
    fontSize: 13,
    // color será definido via theme
    fontWeight: '500' as const,
    letterSpacing: 0.2
  },
  serviceCardTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    // color será definido via theme
    lineHeight: 23,
    marginBottom: 12,
    letterSpacing: 0.2
  },
  progressContainer: {
    marginTop: 8
  },
  progressBar: {
    height: 5,
    // backgroundColor será definido via theme
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden' as const
  },
  progressFill: {
    height: '100%',
    // backgroundColor será definido via theme
    borderRadius: 3
  },
  progressText: {
    fontSize: 12,
    // color será definido via theme
    fontWeight: '500' as const,
    letterSpacing: 0.2
  },
  modalOverlay: {
    flex: 1,
    // backgroundColor será definido via theme
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
    width: '100%',
    maxWidth: 450,
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000', // Mantido como está
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700' as const,
    letterSpacing: 0.3
  },
  modalClose: {
    fontSize: 28,
    fontWeight: '300' as const
  },
  modalSection: {
    marginBottom: 24
  },
  modalSectionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    marginBottom: 16,
    textTransform: 'uppercase' as const,
    letterSpacing: 1
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  themeToggleLabel: {
    fontSize: 17,
    fontWeight: '500' as const,
    letterSpacing: 0.2
  },
  modalDivider: {
    height: 1,
    // backgroundColor será definido via theme
    marginVertical: 20
  },
  logoutButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  logoutButtonText: {
    color: '#fff', // Mantido para contraste
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: 0.3
  },
});