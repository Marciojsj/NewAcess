import { Platform } from 'react-native';

// @ts-ignore
const webStyles = require('./UsersScreen.styles.web').styles;
// @ts-ignore
const nativeStyles = require('./UsersScreen.styles.native').styles;

export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
