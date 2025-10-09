/**
 * Style Selector
 * Exporta estilos corretos baseado na plataforma
 */

import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./alertasScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./alertasScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
