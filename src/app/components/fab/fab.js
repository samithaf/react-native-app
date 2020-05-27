import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Dimensions,
  View,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Title3} from '..';

const {width} = Dimensions.get('window');

const FabPanel = ({onClose}) => {
  const fabPanelTranslate = useRef(new Animated.Value(272)).current;

  useEffect(() => {
    Animated.timing(fabPanelTranslate, {
      toValue: 0,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }, [fabPanelTranslate]);

  const close = () => {
    Animated.timing(fabPanelTranslate, {
      toValue: 272,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: false,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Animated.View
      style={[styles.fabPanel, {transform: [{translateY: fabPanelTranslate}]}]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.fabPanelCloseButton}
        onPress={close}>
        <Image source={require('../../../../assets/images/cross/cross.png')} />
      </TouchableOpacity>
      <View style={styles.fabPanelBody}>
        <Title3>Preferences for this page</Title3>
      </View>
    </Animated.View>
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
  },
  fabPanelCloseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 44,
    height: 44,
    marginRight: 20,
    marginTop: 10,
  },
  fabPanelBody: {
    paddingLeft: 32,
    paddingRight: 32,
  },
});
