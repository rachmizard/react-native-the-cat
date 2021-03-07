import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Button from './../../components/Button';

import propTypes from 'prop-types';

export const Cats = (props) => {
  return (
    <View>
      <Text
        style={{
          margin: 10,
          fontSize: 14,
          fontWeight: '700',
        }}>
        Most Picked
      </Text>
      <ScrollView horizontal={true}>
        {props.mostPicked.map((cat, index) => (
          <View key={index} style={{paddingBottom: 20}}>
            <View
              style={{
                margin: 10,
                backgroundColor: 'white',
                shadowColor: 'rgb(50,50,50)',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                borderRadius: 20,
                elevation: 5,
                maxHeight: 'auto',
                alignSelf: 'center',
              }}>
              <TouchableWithoutFeedback
                activeOpacity={0.5}
                onPress={() => alert('hayo')}>
                <Image
                  source={{uri: cat.url}}
                  resizeMode="cover"
                  style={styles.imageWrapper}></Image>
              </TouchableWithoutFeedback>
            </View>
            <View style={{alignSelf: 'center', width: 100}}>
              <Button type="primary">Order Now</Button>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text
        style={{
          margin: 10,
          fontSize: 14,
          fontWeight: '700',
        }}>
        Cat of Breeds
      </Text>
      <ScrollView horizontal={true}>
        {props.catOfBreeds.map((cat, index) => (
          <View key={index} style={{paddingBottom: 20}}>
            <View
              style={{
                margin: 10,
                backgroundColor: 'white',
                shadowColor: 'rgb(50,50,50)',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                borderRadius: 20,
                elevation: 5,
                maxHeight: 'auto',
                alignSelf: 'center',
              }}>
              <TouchableWithoutFeedback
                activeOpacity={0.5}
                onPress={() => alert('hayo')}>
                <Image
                  source={{uri: cat.image ? cat.image.url : ''}}
                  resizeMode="cover"
                  style={styles.imageWrapper}></Image>
              </TouchableWithoutFeedback>
            </View>
            <View style={{alignSelf: 'center', width: 100}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#707070',
                  paddingVertical: 5,
                }}>
                {cat.name}
              </Text>
              <Button type="primary">Meow me!</Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

Cats.propTypes = {
  mostPicked: propTypes.array,
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
