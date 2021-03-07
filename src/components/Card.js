import React from 'react';
import {View} from 'react-native';

export const Card = (props) => {
  return (
    <View
      style={{
        margin: 10,
        backgroundColor: 'white',
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        borderRadius: 20,
        elevation: 2,
        maxHeight: 'auto',
      }}>
      {props.children}
    </View>
  );
};
