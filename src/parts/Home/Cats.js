import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Button from './../../components/Button';

import propTypes from 'prop-types';
import LoaderIndicator from '../../components/LoaderIndicator';
import {Axios, Env} from '../../config';

export const Cats = (props) => {
  const [currentMyFav, setCurrentMyFav] = useState([]);

  const handleFavourite = ({id}) => {
    return Axios.post('/favourites', {
      image_id: id,
      sub_id: Env.SUB_ID,
    }).then(() => fecthMyFav());
  };

  const handleUnFav = (imageId) => {
    const {id} = currentMyFav.find((e) => e.image_id === imageId) || {};

    return Axios.delete(`/favourites/${id}`)
      .then(() => fecthMyFav())
      .then(() =>
        ToastAndroid.showWithGravity(
          'Im so sad :(',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        ),
      );
  };

  const fecthMyFav = () => {
    return Axios.get('/favourites', props.payload).then(({data}) =>
      setCurrentMyFav(data),
    );
  };

  const isAlreadyFav = (id) => {
    return currentMyFav.some((e) => e.image_id === id);
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          margin: 10,
          fontSize: 14,
          fontWeight: '700',
        }}>
        Most Picked
      </Text>
      {props.isLoader ? (
        <LoaderIndicator isShow={props.isLoader} />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {props.mostPicked.map((cat, index) => (
            <View key={index} style={{paddingBottom: 20}}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: 'white',
                  shadowColor: 'rgb(50,50,50)',
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  borderRadius: 10,
                  elevation: 5,
                  maxHeight: 'auto',
                  alignSelf: 'center',
                }}>
                <TouchableWithoutFeedback
                  activeOpacity={0.5}
                  onPress={() => props.navigation.navigate('Favourite')}>
                  <Image
                    source={{uri: cat.url}}
                    resizeMode="cover"
                    style={styles.imageWrapper}></Image>
                </TouchableWithoutFeedback>
              </View>
              <View style={{alignSelf: 'center', width: 100}}>
                {isAlreadyFav(cat.id) ? (
                  <Button type="primary" onPress={() => handleUnFav(cat.id)}>
                    <Icon name="heart" color="red" size={20} />
                  </Button>
                ) : (
                  <Button type="primary" onPress={() => handleFavourite(cat)}>
                    Love Me!
                  </Button>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <Text
        style={{
          margin: 10,
          fontSize: 14,
          fontWeight: '700',
        }}>
        Cat of Breeds
      </Text>
      {props.isLoader ? (
        <LoaderIndicator isShow={props.isLoader} />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {props.catOfBreeds.map((cat, index) => (
            <View key={index} style={{paddingBottom: 20}}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: 'white',
                  shadowColor: 'rgb(50,50,50)',
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  borderRadius: 10,
                  elevation: 5,
                  maxHeight: 'auto',
                  alignSelf: 'center',
                }}>
                <TouchableWithoutFeedback activeOpacity={1}>
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
                <Button type="success">Meow me!</Button>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

Cats.propTypes = {
  mostPicked: propTypes.array,
  catOfBreeds: propTypes.array,
  isLoader: propTypes.bool,
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
