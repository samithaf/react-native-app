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
import {Title1, Callout} from '..';

const {width} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 270;
const HEADER_MIN_HEIGHT = Platform.select({ios: 120, android: 100});
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const ExpandedAssetCard = (props) => {
  const ribbonTopAnim = useRef(new Animated.Value(props.pageY)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT / 4],
    outputRange: [1, 0],
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
            {useNativeDriver: false},
          )}>
          <View style={styles.bodyContainer}>
            <View style={styles.body} />
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
      <Animated.View
        style={[styles.card, {transform: [{translateY: headerTranslate}]}]}
        pointerEvents="none">
        <View style={[styles.header]}>
          <Animated.View
            nativeID={'headerContainer'}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(235, 239, 242)',
    flex: 1,
  },
  card: {
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
  navBar: {
    backgroundColor: 'rgb(0, 114, 191)',
  },
  ribbonContainer: {
    height: 90,
    width: width - 32,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  ribbon: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },
  header: {
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
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(235, 239, 242)',
    marginTop: HEADER_MAX_HEIGHT,
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
