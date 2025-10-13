import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./AccessScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./AccessScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
