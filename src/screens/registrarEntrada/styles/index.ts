import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./RegistrarEntradaScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./RegistrarEntradaScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
