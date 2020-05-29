import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import icon from '../../../../assets/images/cancel/cancel.png';
const {height} = Dimensions.get('window');

export const CloseButton = ({componentId}) => {
  const onPress = () => {
    Navigation.pop(componentId);
  };
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles.container}
      testID="close-button">
      <Image
        style={{width: 18, height: 18}}
        source={icon}
        testID="close-button-icon"
      />
    </TouchableOpacity>
  );
};
const TOP =
  (Platform.OS === 'ios' && height <= 568) ||
  (Platform.OS === 'android' && height <= 700)
    ? 30
    : 55;
const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    position: 'absolute',
    top: TOP,
    right: 0,
    zIndex: 10,
  },
});
