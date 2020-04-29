import {Navigation} from 'react-native-navigation';
import 'expo-asset';
import App from './App';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'com.myApp.WelcomeScreen',
                        },
                    },
                ],
            },
        },
    });
});
