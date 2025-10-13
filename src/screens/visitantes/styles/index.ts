import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./VisitantesScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./VisitantesScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
