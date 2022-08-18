import {Navigation} from 'react-native-navigation';
import {registerComponents} from './routes';
import {Platform} from 'react-native';

const registerAppLaunchedListener = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
      },
      bottomTabs: {
        titleDisplayMode: 'alwaysShow',
      },
      bottomTab: {
        fontSize: 11,
        textColor: 'rgb(91, 103, 112)',
        //selectedIconColor: 'rgb(0, 000, 171)',
        selectedTextColor: 'rgb(0, 123, 171)',
      },
      popGesture: false,
      animations: {
        setRoot: {
          waitForRender: true,
        },
        push: {
          waitForRender: true,
        },
        pop: {
          waitForRender: true,
        },
        showModal: {
          waitForRender: true,
        },
        dismissModal: {
          waitForRender: true,
        },
      },
    });

    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'secure.home',
                      options: {
                        layout: {
                          orientation: ['portrait'],
                          backgroundColor: '#2d5876',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'secure.investments',
                      options: {
                        layout: {
                          orientation: ['portrait'],
                          backgroundColor: '#2d5876',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'secure.transactions',
                      options: {
                        layout: {
                          orientation: ['portrait'],
                          backgroundColor: '#2d5876',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'secure.alerts',
                      options: {
                        layout: {
                          orientation: ['portrait'],
                          backgroundColor: '#2d5876',
                        },
                      },
                    },
                  },
                ],
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: 'secure.more',
                      options: {
                        layout: {
                          orientation: ['portrait'],
                          backgroundColor: '#2d5876',
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  });
};

export const startApp = () => {
  registerComponents();
  registerAppLaunchedListener();
};
