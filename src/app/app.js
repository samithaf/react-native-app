import {Navigation} from 'react-native-navigation';

import Home from "./screens/Home";

export function start() {
    Navigation.registerComponent('Home', () => Home);
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                stack: {
                    children: [
                        {
                            component: {
                                name: 'Home',
                            },
                        },
                    ],
                },
            },
        });
    });
}
