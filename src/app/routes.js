import { Navigation } from 'react-native-navigation';
import SecureHomeScreen from './screens/secure/home/home';
import TradingScreen from './screens/secure/trading/trading';

export const registerComponents = () => {
    Navigation.registerComponent('secure.home', () => SecureHomeScreen);
    Navigation.registerComponent('secure.trading', () => TradingScreen);
};
