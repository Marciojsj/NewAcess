import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./ConfiguracoesScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./ConfiguracoesScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
