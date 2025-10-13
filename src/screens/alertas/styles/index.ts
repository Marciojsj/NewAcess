import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./AlertasScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./AlertasScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
