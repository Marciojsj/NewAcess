import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./RegistrarSaidaScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./RegistrarSaidaScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
