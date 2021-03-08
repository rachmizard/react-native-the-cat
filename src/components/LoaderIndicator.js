import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function LoaderIndicator(props) {
  return (
    <View style={[styles.container, styles.horizontal]}>
      {props.isShow && <ActivityIndicator size="large" color="black" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
