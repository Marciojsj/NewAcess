import { Platform } from 'react-native';
import { Theme } from '../../../contexts/ThemeContext';

export const createStyles = (theme: Theme, isDark: boolean) => {
  const stylesModule = Platform.select({
    web: require('./EntidadeScreen.styles.web').default,
    default: require('./EntidadeScreen.styles.native').default,
  });
  
  return stylesModule(theme, isDark);
};

export default createStyles;