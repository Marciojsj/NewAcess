import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./RelatoriosScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./RelatoriosScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
