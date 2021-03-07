import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import propTypes from 'prop-types'

export default function Button(props) {
  const styles = StyleSheet.create({
    buttonContainer: {
      elevation: 8,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    textButtonContainer: {
      fontSize: 12,
      color: '#fff',
      fontWeight: '700',
      alignSelf: 'center',
      textTransform: 'uppercase',
    },
  });

  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        props.type === 'primary' && {
          backgroundColor: '#65499c',
        },
        props.type === 'success' && {
          backgroundColor: '#9ccc65',
        },
      ]}
      onPress={props.onPress}>
      <Text style={styles.textButtonContainer}>{props.children}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
    type: propTypes.string,
    onPress: propTypes.func
}