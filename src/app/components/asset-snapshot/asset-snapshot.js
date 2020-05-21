import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title3, Caption2} from './../';

export const AssetSnapshot = ({
  marketValue,
  shares,
  lastPrice,
  updatedTime,
}) => {
  return (
    <>
      <View style={styles.listItem}>
        <Title3 style={styles.title3}>${marketValue}</Title3>
        <Caption2 style={styles.caption2}>market value</Caption2>
      </View>
      <View style={styles.listItem}>
        <Title3 style={styles.title3}>{shares}</Title3>
        <Caption2 style={styles.caption2}>Shares</Caption2>
      </View>
      <View style={styles.listItem}>
        <Title3 style={styles.title3}>${lastPrice}</Title3>
        <Caption2 style={styles.caption2}>latest price</Caption2>
        <Caption2 style={[styles.caption2, {color: 'rgb(91,103, 112)'}]}>
          ({updatedTime})
        </Caption2>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    alignItems: 'center',
  },
  caption2: {
    textTransform: 'uppercase',
  },
  title3: {
    fontWeight: '500',
  },
});
