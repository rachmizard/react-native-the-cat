import React from 'react';
import {Text, StyleSheet, View, Image, ToastAndroid} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import propTypes from 'prop-types';
import {Card} from '../../components/Card';
import Button from '../../components/Button';
import Axios from '../../config/axios';
import {useState} from 'react';

export const Vote = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVote = (value, vote) => {
    setIsDisabled(true);

    const {id} = value;

    const payload = {
      image_id: id,
      sub_id: 'USERABC',
      value: vote,
    };

    return Axios.post('/votes', payload)
      .then(() =>
        ToastAndroid.showWithGravity(
          'Thanks for your vote!',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        ),
      )
      .then(() => props.fetchVoteImages())
      .then(() => setTimeout(() => setIsDisabled(false), 1500));
  };

  return (
    <View style={styles.thumbWrapper}>
      <Text
        style={{
          margin: 10,
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Votes
      </Text>
      {props.voteImages.map((cat, index) => (
        <Card key={index}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              margin: 10,
              maxWidth: '100%',
            }}>
            <Image
              source={{
                uri: cat.url,
              }}
              style={styles.imgWrapper}></Image>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{paddingRight: 5}}>
                  <Button
                    onPress={() => handleVote(cat, 1)}
                    type="primary"
                    isDisabled={isDisabled}>
                    <Icon name="heart" size={15} color="white">
                      {' '}
                      Love It
                    </Icon>
                  </Button>
                </View>
                <Button
                  type="danger"
                  onPress={() => handleVote(cat, 2)}
                  isDisabled={isDisabled}>
                  <Icon name="thumbs-down" size={15} color="white">
                    {' '}
                    Nope It
                  </Icon>
                </Button>
              </View>
            </View>
          </View>
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  thumbWrapper: {
    flex: 1,
  },
  imgWrapper: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginRight: 14,
  },
});

Vote.propTypes = {
  voteImages: propTypes.array,
};
