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
const styles = StyleSheet.create({
  container: {
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.select({ios: height <= 568 ? 20 : 30, android: 5}),
    alignSelf: 'flex-end',
    zIndex: 10,
  },
});
