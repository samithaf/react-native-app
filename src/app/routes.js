import {Navigation} from 'react-native-navigation';
import SecureHomeScreen from './screens/secure/home/home';
import SecureTradingScreen from './screens/secure/trading/trading';
import {
  TransactionsScreen,
  TransactionDetailsScreen,
  InvestmentsScreen,
  AlertsScreen,
  MoreScreen,
} from './screens/secure/other/other';

export const registerComponents = () => {
  Navigation.registerComponent('secure.home', () => SecureHomeScreen);
  Navigation.registerComponent('secure.trading', () => SecureTradingScreen);
  Navigation.registerComponent('secure.transactions', () => TransactionsScreen);
  Navigation.registerComponent(
    'secure.transactionDetails',
    () => TransactionDetailsScreen,
  );
  Navigation.registerComponent('secure.investments', () => InvestmentsScreen);
  Navigation.registerComponent('secure.alerts', () => AlertsScreen);
  Navigation.registerComponent('secure.more', () => MoreScreen);
};
