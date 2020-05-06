import { Navigation } from 'react-native-navigation';
import SecureHomeScreen from './screens/secure/home/home'

export const registerComponents = () => {
    Navigation.registerComponent('secure.home', () => SecureHomeScreen);
};
