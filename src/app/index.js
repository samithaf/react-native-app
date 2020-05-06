import {Navigation} from 'react-native-navigation';
import {registerComponents} from './routes';

const registerAppLaunchedListener = () => {
    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setDefaultOptions({
            topBar: {
                visible: false,
                height: 0
            },
            popGesture: false,
            animations: {
                setRoot: {
                    waitForRender: true
                },
                push: {
                    waitForRender: true
                },
                pop: {
                    waitForRender: true
                },
                showModal: {
                    waitForRender: true
                },
                dismissModal: {
                    waitForRender: true
                }
            }
        });

        Navigation.setRoot({
            root: {
                stack: {
                    children: [
                        {
                            component: {
                                name: 'secure.home',
                                options: {
                                    layout: {
                                        orientation: ['portrait'],
                                        backgroundColor: '#2d5876'
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        });
    });
};

export const startApp = () => {
    registerComponents();
    registerAppLaunchedListener();
};
