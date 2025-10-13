/**
 * Platform-specific style selector
 * Exports the correct styles based on the platform
 */

import { Platform } from 'react-native';

// Import platform-specific styles
import webStyles from './LoginScreen.styles.web';
import nativeStyles from './LoginScreen.styles.native';

// Export the appropriate styles based on platform
export const styles = Platform.OS === 'web' ? webStyles : nativeStyles;
