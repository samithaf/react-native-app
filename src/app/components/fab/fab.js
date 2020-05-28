import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Dimensions,
  View,
} from 'react-native';
import React, {useRef, useState, useLayoutEffect} from 'react';
import {Title3} from '..';

const {width} = Dimensions.get('window');

const FabPanel = ({onClose}) => {
  const fabPanelTranslate = useRef(new Animated.Value(272)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const animationDefaults = {
    duration: 350,
  };

  useLayoutEffect(() => {
    Animated.parallel([
      Animated.timing(fabPanelTranslate, {
        toValue: 0,
        useNativeDriver: false,
        ...animationDefaults,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        useNativeDriver: true,
        ...animationDefaults,
      }),
    ]).start();
  }, [fabPanelTranslate, backdropOpacity, animationDefaults]);

  const close = () => {
    Animated.parallel([
      Animated.timing(fabPanelTranslate, {
        toValue: 272,
        useNativeDriver: false,
        ...animationDefaults,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        useNativeDriver: true,
        ...animationDefaults,
      }),
    ]).start(() => onClose());
  };

  return (
    <>
      <Animated.View
        onStartShouldSetResponder={close}
        style={[
          StyleSheet.absoluteFill,
          styles.backdrop,
          {opacity: backdropOpacity},
        ]}
      />
      <Animated.View
        style={[
          styles.fabPanel,
          {transform: [{translateY: fabPanelTranslate}]},
        ]}>
        <View style={styles.fabPanelHeader}>
          <Title3 style={styles.fabPanelTitle}>
            Preferences for this page
          </Title3>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.fabPanelCloseButton}
            onPress={close}>
            <Image
              source={require('../../../../assets/images/cross/cross.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.fabPanelBody} />
      </Animated.View>
    </>
  );
};

export const Fab = (props) => {
  const [panelVisible, setPanelVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.fabContainerBottom}
        onPress={() => setPanelVisible(!panelVisible)}>
        <Image source={require('../../../../assets/images/fab/fab.png')} />
      </TouchableOpacity>
      {panelVisible && <FabPanel onClose={() => setPanelVisible(false)} />}
    </>
  );
};

const styles = StyleSheet.create({
  fabContainerBottom: {
    borderWidth: 1,
    borderColor: 'rgb(0,123,171)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: Platform.select({ios: 45, android: 10}),
    right: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  fabPanel: {
    borderWidth: 1,
    borderColor: '#fff',
    width: width,
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 272,
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  fabPanelHeader: {
    flexDirection: 'row',
    display: 'flex',
    height: 44,
    marginTop: 5,
  },
  fabPanelCloseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 44,
    height: 44,
    marginRight: 16,
  },
  fabPanelTitle: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
  },
  fabPanelBody: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
});
