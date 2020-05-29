import React, {useLayoutEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  Easing,
  Platform,
} from 'react-native';
import {ScrollableTab, Tab, Tabs, List, Item, Text} from 'native-base';
import {Title1, Callout, SubHead, Caption1} from '..';
import {CloseButton} from '../close-button/close-button';

const {width, height} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.select({ios: 88, android: 68});
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SAFE_AREA_TOP = Platform.select({ios: 44, android: 0});
const BG_COLOR = '#fff';
const TAB_PROPS = {
  tabStyle: {width: width / 3, backgroundColor: BG_COLOR},
  activeTabStyle: {width: width / 3, backgroundColor: BG_COLOR},
  textStyle: {color: 'rgb(91, 103, 112)', fontWeight: '500'},
  activeTextStyle: {color: 'rgb(0, 123, 171)', fontWeight: '700'},
  underlineStyle: {borderBottomWidth: 5},
};

const collapseHeaderTextContainerPaddingTop = () => {
  let result = Platform.select({ios: 45, android: 15});
  // adjustment to accomodate smaller devices (e.g. iPhone SE second gen)
  if (
    (Platform.OS === 'ios' && height <= 667) ||
    (Platform.OS === 'android' && height <= 700)
  ) {
    result -= 15;
  }
  return result;
};

const bodyContainerMarginTop = () => {
  //568
  // adjustment to accomodate smaller devices (e.g. iPhone SE first gen)
  const factor =
    (Platform.OS === 'ios' && height <= 568) ||
    (Platform.OS === 'android' && height <= 700)
      ? 20
      : 0;

  return (
    Platform.select({
      ios: HEADER_MAX_HEIGHT - SAFE_AREA_TOP,
      android: HEADER_MAX_HEIGHT,
    }) + factor
  );
};

const expandHeaderPaddingTop = () => {
  return (Platform.OS === 'ios' && height <= 568) ||
    (Platform.OS === 'android' && height <= 700)
    ? 40
    : 60;
};

const tabContent = (
  <List>
    {new Array(50).fill(null).map((_, i) => (
      <Item key={i}>
        <Text style={{paddingTop: 10, paddingBottom: 10}}>Item {i}</Text>
      </Item>
    ))}
  </List>
);

export const ExpandedAssetCard = (props) => {
  const ribbonTopAnim = useRef(new Animated.Value(props.pageY)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const expandHeaderTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    extrapolate: 'clamp',
  });

  const tabBarTranslate = Animated.add(scrollY, expandHeaderTranslate);

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MIN_HEIGHT / 3.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const collapseHeaderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const collapseHeaderTextOpacity = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MIN_HEIGHT,
      HEADER_SCROLL_DISTANCE - 20,
      HEADER_SCROLL_DISTANCE,
    ],
    outputRange: [0, 0, 0.1, 1],
    extrapolate: 'clamp',
  });

  useLayoutEffect(() => {
    Animated.timing(ribbonTopAnim, {
      toValue: 195,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.in(Easing.elastic(1)),
    }).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          <View style={styles.bodyContainer}>
            <Tabs
              renderTabBar={(props) => (
                <Animated.View
                  style={[
                    styles.tabBar,
                    {
                      transform: [{translateY: tabBarTranslate}],
                    },
                  ]}>
                  <ScrollableTab
                    {...props}
                    underlineStyle={{backgroundColor: 'rgb(0, 123, 171)'}}
                  />
                </Animated.View>
              )}>
              <Tab heading="Buy" {...TAB_PROPS}>
                <View style={styles.tabContent}>{tabContent}</View>
              </Tab>
              <Tab heading="Sell" {...TAB_PROPS}>
                <View style={styles.tabContent}>{tabContent}</View>
              </Tab>
              <Tab heading="Details" {...TAB_PROPS}>
                <View style={styles.tabContent}>{tabContent}</View>
              </Tab>
            </Tabs>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.expandHeaderContainer,
          {transform: [{translateY: expandHeaderTranslate}]},
        ]}
        pointerEvents="none">
        <View style={[styles.expandHeader]}>
          <Animated.View
            nativeID={'expandHeaderContainer'}
            style={{opacity: fadeAnim}}>
            <Animated.View style={[styles.chart]}>
              <Animated.Image
                style={{opacity: imageOpacity}}
                source={require('../../../../assets/images/chart/chart.png')}
              />
            </Animated.View>
            <Title1 style={[styles.title1]} nativeID={'code'}>
              {props.code}
            </Title1>
            <Callout style={[styles.callout]} nativeID={'name'}>
              {props.name}
            </Callout>
          </Animated.View>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.collapseHeaderContainer,
          {opacity: collapseHeaderOpacity},
        ]}>
        <Animated.View
          style={[
            styles.collapseHeaderTextContainer,
            {opacity: collapseHeaderTextOpacity},
          ]}>
          <SubHead style={[styles.subHead]}>{props.code}</SubHead>
          <Caption1 style={[styles.caption1]}>{props.name}</Caption1>
        </Animated.View>
      </Animated.View>
      <CloseButton componentId={props.componentId} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    flex: 1,
  },
  expandHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(0, 114, 191)',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    flex: 1,
    display: 'flex',
    zIndex: 1,
  },
  collapseHeaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: HEADER_MIN_HEIGHT,
    backgroundColor: 'rgb(0, 114, 191)',
    flex: 1,
    zIndex: 2,
  },
  collapseHeaderTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: collapseHeaderTextContainerPaddingTop(),
  },
  expandHeader: {
    backgroundColor: 'rgb(0, 114, 191)',
    paddingTop: expandHeaderPaddingTop(),
    paddingLeft: 32,
    paddingRight: 32,
    position: 'relative',
    zIndex: 1,
    flex: 1,
  },
  chart: {
    height: 120,
    paddingTop: 0,
  },
  title1: {
    fontWeight: '500',
    color: '#fff',
  },
  callout: {
    fontWeight: '500',
    color: '#fff',
  },
  subHead: {
    fontWeight: '500',
    color: '#fff',
  },
  caption1: {
    fontWeight: '500',
    color: '#fff',
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: bodyContainerMarginTop(),
  },
  body: {
    backgroundColor: 'white',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    width: width - 32,
    height: 1400,
  },
  listItem: {
    flex: 0.33,
  },
  tabBar: {
    zIndex: 1,
    width: width,
    backgroundColor: BG_COLOR,
    shadowColor: 'rgba(0,0,0,0.8)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  tabContent: {
    marginRight: 24,
    marginLeft: 24,
  },
});
