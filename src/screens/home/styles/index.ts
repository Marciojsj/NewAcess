/**
 * Style Selector
 * Exporta estilos corretos baseado na plataforma
 */

import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./homeScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./homeScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
