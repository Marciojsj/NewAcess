import { Platform } from 'react-native';

const styles = Platform.select({
  web: require('./EntidadeScreen.styles.web').default,
  default: require('./EntidadeScreen.styles.native').default,
});

export default styles;