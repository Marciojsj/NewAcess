// src/screens/Home/styles/HomeScreen.styles.native.ts
import { StyleSheet, Dimensions, Platform } from "react-native";
import { responsive, deviceType } from "../../../utils/responsive";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0a' 
  },
  scrollContent: { 
    paddingBottom: deviceType.isDesktop ? responsive.padding.lg : 120, // Espaço para footer mobile
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
    paddingTop: responsive.padding.sm, 
    paddingBottom: responsive.padding.md 
  },
  headerDesktop: { 
    paddingTop: responsive.padding.lg, 
    paddingBottom: responsive.padding.xl 
  },
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' as const 
  },
  greetingContainer: { 
    flex: 1 
  },
  greeting: { 
    fontSize: responsive.fontSize.lg, 
    fontWeight: '700' as const, 
    color: '#fff' 
  },
  greetingDesktop: { 
    fontSize: responsive.fontSize.xxl 
  },
  accountType: { 
    fontSize: responsive.fontSize.sm, 
    color: '#aaa' 
  },
  accountTypeDesktop: { 
    fontSize: responsive.fontSize.md 
  },
  profileButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  profileIcon: { 
    fontSize: 18 
  },
  quickActionsContainer: { 
    marginVertical: responsive.spacing.lg 
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
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8 
  },
  quickActionIcon: { 
    fontSize: 28, 
    marginBottom: 6 
  },
  quickActionTitle: { 
    fontSize: 12, 
    fontWeight: '600' as const, 
    color: '#fff', 
    textAlign: 'center' 
  },
  serviceCardsContainer: { 
    marginBottom: 1 
  },
  sectionTitle: { 
    fontSize: responsive.fontSize.md, 
    fontWeight: '600' as const, 
    color: '#fff', 
    paddingHorizontal: responsive.padding.md, 
    marginBottom: responsive.spacing.md 
  },
  sectionTitleDesktop: { 
    fontSize: responsive.fontSize.lg, 
    marginBottom: responsive.spacing.lg 
  },
  serviceCardsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' as const, 
    justifyContent: 'space-between', 
    paddingHorizontal: responsive.padding.xs, 
    alignItems: 'stretch' as const 
  },
  serviceCard: { 
    borderRadius: 16, 
    padding: 20, 
    elevation: 6, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    flex: 1, 
    justifyContent: 'space-between' as const 
  },
  serviceCardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' as const, 
    marginBottom: 12 
  },
  serviceCardIcon: { 
    fontSize: 24 
  },
  serviceCardSubtitle: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.85)', 
    fontWeight: '500' as const 
  },
  serviceCardTitle: { 
    fontSize: 16, 
    fontWeight: '700' as const, 
    color: '#fff', 
    lineHeight: 22, 
    marginBottom: 12 
  },
  progressContainer: { 
    marginTop: 1 
  },
  progressBar: { 
    height: 5, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    borderRadius: 3, 
    marginBottom: 4 
  },
  progressFill: { 
    height: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 3 
  },
  progressText: { 
    fontSize: 12, 
    color: 'rgba(255,255,255,0.9)', 
    fontWeight: '500' as const 
  },
});