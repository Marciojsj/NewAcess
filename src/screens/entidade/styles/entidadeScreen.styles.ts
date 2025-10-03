import { Platform } from 'react-native';

const styles = Platform.select({
  web: require('./entidadeScreen.styles.web').default,
  default: require('./entidadeScreen.styles.native').default,
});

export default styles;