import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

import icon from '../../../../assets/images/cancel/cancel.png';

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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: 44,
    height: 44,
    marginRight: 8,
  },
});
