import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./PermissoesScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./PermissoesScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
