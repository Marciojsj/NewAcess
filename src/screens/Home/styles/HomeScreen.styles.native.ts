// src/screens/Home/styles/HomeScreen.styles.native.ts
import { StyleSheet, Dimensions, Platform } from "react-native";
import { responsive, deviceType } from "../../../utils/responsive";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1d2e'
  },
  scrollContent: {
    paddingBottom: deviceType.isDesktop ? responsive.padding.lg : 120,
    ...(Platform.OS === 'web' && { minHeight: screenHeight })
  },
  scrollContentDesktop: {
    paddingHorizontal: 0
  },
  backgroundCircle: {
    position: 'absolute' as const,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(138,43,226,0.2)'
  },
  circle1: {
    width: screenWidth * 1.2,
    height: screenWidth * 1.2,
    top: -screenWidth * 0.4,
    left: -screenWidth * 0.2
  },
  circle2: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.9,
    top: screenHeight * 0.5,
    right: -screenWidth * 0.3
  },
  header: {
    paddingHorizontal: responsive.padding.md,
    paddingTop: responsive.padding.lg,
    paddingBottom: responsive.padding.md
  },
  headerDesktop: {
    paddingTop: responsive.padding.xl,
    paddingBottom: responsive.padding.lg
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start' as const,
    marginBottom: responsive.spacing.sm
  },
  greetingContainer: {
    flex: 1
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#fff',
    marginBottom: 4
  },
  greetingDesktop: {
    fontSize: 32
  },
  accountType: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '400' as const
  },
  accountTypeDesktop: {
    fontSize: 15
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2
  },
  profileIcon: {
    fontSize: 16
  },
  quickActionsContainer: {
    marginTop: responsive.spacing.md,
    marginBottom: responsive.spacing.lg
  },
  quickActionsContainerDesktop: {
    marginVertical: responsive.spacing.xl
  },
  quickActionsScroll: {
    paddingHorizontal: responsive.padding.md,
    ...(deviceType.isDesktop && { justifyContent: 'center', flexGrow: 1 })
  },
  quickActionButton: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6
  },
  quickActionIcon: {
    fontSize: 26,
    marginBottom: 4
  },
  quickActionTitle: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: '#fff',
    textAlign: 'center'
  },
  serviceCardsContainer: {
    marginBottom: responsive.spacing.lg,
    paddingHorizontal: responsive.padding.md
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#fff',
    marginBottom: responsive.spacing.md
  },
  sectionTitleDesktop: {
    fontSize: 20,
    marginBottom: responsive.spacing.lg
  },
  serviceCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between',
    gap: 12
  },
  serviceCard: {
    borderRadius: 18,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    minHeight: 120,
    justifyContent: 'space-between' as const
  },
  serviceCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start' as const,
    marginBottom: 8
  },
  serviceCardIcon: {
    fontSize: 22
  },
  serviceCardSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500' as const
  },
  serviceCardTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 8
  },
  progressContainer: {
    marginTop: 4
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginBottom: 4
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2
  },
  progressText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500' as const
  },
});