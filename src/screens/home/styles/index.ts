import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./HomeScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./HomeScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
