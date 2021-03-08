import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import propTypes from 'prop-types';

export default function Button(props) {
  const isDisabled = props.isDisabled ? true : false;

  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        styles.buttonContainer,
        props.type === 'primary' && {
          backgroundColor: '#65499c',
        },
        props.type === 'success' && {
          backgroundColor: '#9ccc65',
        },
        props.type === 'danger' && {
          backgroundColor: '#d32f2f',
        },
      ]}
      onPress={props.onPress}>
      <Text style={styles.textButtonContainer}>{props.children}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  type: propTypes.string,
  onPress: propTypes.func,
  isDisabled: propTypes.bool,
};

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 5,
    borderRadius: 5,
    paddingVertical: 12,
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
