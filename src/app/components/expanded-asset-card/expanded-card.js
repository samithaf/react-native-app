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
import {Title1, Callout, SubHead, Caption1} from '..';

const {width, height} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 270;
const HEADER_MIN_HEIGHT = Platform.select({ios: 88, android: 68});
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const SAFE_AREA_TOP = Platform.select({ios: 44, android: 0});

const collapseHeaderTextContainerPaddingTop = () => {
  let result = Platform.select({ios: 45, android: 15});
  // adjustment to accomodate smaller devices (e.g. iPhone SE)
  if (
    (Platform.OS === 'ios' && height <= 667) ||
    (Platform.OS === 'android' && height <= 700)
  ) {
    result -= 15;
  }
  return result;
};

export const ExpandedAssetCard = (props) => {
  const ribbonTopAnim = useRef(new Animated.Value(props.pageY)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const expandHeaderTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT / 4],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const collapseHeaderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
    outputRange: [0, 0, 1],
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
            <View style={styles.body} />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(235, 239, 242)',
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
    paddingTop: 80,
    flex: 1,
    flexDirection: 'column',
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
    height: 240,
    paddingLeft: 32,
    paddingRight: 32,
    position: 'relative',
    zIndex: 1,
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
    backgroundColor: 'rgb(235, 239, 242)',
    marginTop:
      Platform.select({
        ios: HEADER_MAX_HEIGHT - SAFE_AREA_TOP,
        android: HEADER_MAX_HEIGHT,
      }) + 20,
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
});
