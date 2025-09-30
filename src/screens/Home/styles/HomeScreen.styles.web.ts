// src/screens/Home/styles/HomeScreen.styles.web.ts
import { StyleSheet, Dimensions } from "react-native";
import { responsive, deviceType } from "../../../utils/responsive";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Estilos específicos para web
const webSpecificStyles = {
  container: { 
    minHeight: "100vh" as any,
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)" as any
  },
  quickActionButton: {
    transition: "all 0.3s ease" as any,
    cursor: "pointer" as any,
    "&:hover": {
      transform: "translateY(-5px)" as any,
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)" as any
    }
  },
  serviceCard: {
    transition: "all 0.3s ease" as any,
    cursor: "pointer" as any,
    "&:hover": {
      transform: "translateY(-3px)" as any,
      boxShadow: "0 8px 20px rgba(0,0,0,0.4)" as any
    }
  },
  profileButton: {
    cursor: "pointer" as any,
    transition: "all 0.2s ease" as any,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.2)" as any
    }
  }
};

export default StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0a0a0a',
    ...webSpecificStyles.container
  },
  scrollContent: { 
    paddingBottom: responsive.padding.lg,
    minHeight: screenHeight
  },
  scrollContentDesktop: { 
    paddingHorizontal: 0 
  },
  backgroundCircle: { 
    position: 'absolute' as const, 
    borderRadius: 999, 
    borderWidth: 2, 
    borderColor: 'rgba(138,43,226,0.15)' 
  },
  circle1: { 
    width: 600, 
    height: 600, 
    top: -200, 
    left: -150 
  },
  circle2: { 
    width: 800, 
    height: 800, 
    top: '40%', 
    right: -300 
  },
  header: { 
    paddingHorizontal: responsive.padding.xl, 
    paddingTop: responsive.padding.lg, 
    paddingBottom: responsive.padding.xl 
  },
  headerDesktop: { 
    paddingTop: responsive.padding.xl, 
    paddingBottom: responsive.padding.xl 
  },
  headerTop: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' as const,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%'
  },
  greetingContainer: { 
    flex: 1 
  },
  greeting: { 
    fontSize: responsive.fontSize.xxl * 1.2, 
    fontWeight: '700' as const, 
    color: '#fff',
    marginBottom: responsive.spacing.xs
  },
  greetingDesktop: { 
    fontSize: responsive.fontSize.xxl * 1.5
  },
  accountType: { 
    fontSize: responsive.fontSize.lg, 
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500' as const
  },
  accountTypeDesktop: { 
    fontSize: responsive.fontSize.xl 
  },
  profileButton: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
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
    maxWidth: 1000,
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
    width: 100, 
    height: 100, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8,
    marginHorizontal: responsive.spacing.md,
    ...webSpecificStyles.quickActionButton
  },
  quickActionIcon: { 
    fontSize: 32, 
    marginBottom: 8 
  },
  quickActionTitle: { 
    fontSize: 14, 
    fontWeight: '600' as const, 
    color: '#fff', 
    textAlign: 'center' 
  },
  serviceCardsContainer: { 
    marginBottom: responsive.spacing.xl,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: responsive.padding.xl
  },
  sectionTitle: { 
    fontSize: responsive.fontSize.xl, 
    fontWeight: '600' as const, 
    color: '#fff', 
    marginBottom: responsive.spacing.lg,
    textAlign: 'center' as const
  },
  sectionTitleDesktop: { 
    fontSize: responsive.fontSize.xxl, 
    marginBottom: responsive.spacing.xl 
  },
  serviceCardsGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' as const, 
    justifyContent: 'center', 
    gap: responsive.spacing.lg,
    alignItems: 'stretch' as const 
  },
  serviceCard: { 
    borderRadius: 20, 
    padding: 24, 
    elevation: 6, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    flex: 1, 
    justifyContent: 'space-between' as const,
    minWidth: 280,
    maxWidth: 320,
    ...webSpecificStyles.serviceCard
  },
  serviceCardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' as const, 
    marginBottom: 16 
  },
  serviceCardIcon: { 
    fontSize: 28 
  },
  serviceCardSubtitle: { 
    fontSize: 14, 
    color: 'rgba(255,255,255,0.85)', 
    fontWeight: '500' as const 
  },
  serviceCardTitle: { 
    fontSize: 18, 
    fontWeight: '700' as const, 
    color: '#fff', 
    lineHeight: 24, 
    marginBottom: 16 
  },
  progressContainer: { 
    marginTop: 8 
  },
  progressBar: { 
    height: 6, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    borderRadius: 3, 
    marginBottom: 6 
  },
  progressFill: { 
    height: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 3 
  },
  progressText: { 
    fontSize: 13, 
    color: 'rgba(255,255,255,0.9)', 
    fontWeight: '500' as const 
  },
});