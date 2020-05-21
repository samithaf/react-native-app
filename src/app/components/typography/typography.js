import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const LargeTitle = (props) => {
  return <Text style={[styles.largeTitle, props.style]}>{props.children}</Text>;
};

export const Title1 = (props) => {
  return <Text style={[styles.title1, props.style]}>{props.children}</Text>;
};

export const Title2 = (props) => {
  return <Text style={[styles.title2, props.style]}>{props.children}</Text>;
};

export const Title3 = (props) => {
  return <Text style={[styles.title3, props.style]}>{props.children}</Text>;
};

export const Headline = (props) => {
  return <Text style={[styles.headline, props.style]}>{props.children}</Text>;
};

export const SubHead = (props) => {
  return <Text style={[styles.subHead, props.style]}>{props.children}</Text>;
};

export const Caption1 = (props) => {
  return <Text style={[styles.caption1, props.style]}>{props.children}</Text>;
};

export const Caption2 = (props) => {
  return <Text style={[styles.caption2, props.style]}>{props.children}</Text>;
};

export const Callout = (props) => {
  return <Text style={[styles.callout, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
  },
  title1: {
    fontSize: 28,
    lineHeight: 34,
  },
  title2: {
    fontSize: 22,
    lineHeight: 26,
  },
  title3: {
    fontSize: 20,
    lineHeight: 24,
  },
  headline: {
    color: 'black',
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '500',
  },
  subHead: {
    fontSize: 17,
    lineHeight: 20,
  },
  caption1: {
    fontSize: 13,
    lineHeight: 16,
  },
  caption2: {
    fontSize: 11,
    lineHeight: 13,
  },
  callout: {
    fontSize: 15,
    lineHeight: 20,
  },
});
