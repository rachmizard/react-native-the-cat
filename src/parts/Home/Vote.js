import React from 'react';
import {Text, StyleSheet, View, Image, ToastAndroid} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import propTypes from 'prop-types';
import {Card} from '../../components/Card';
import Button from '../../components/Button';
import Axios from '../../config/axios';
import {useState} from 'react';
import LoaderIndicator from '../../components/LoaderIndicator';
import {Env} from '../../config';

export const Vote = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVote = (value, vote) => {
    setIsDisabled(true);

    const {id} = value;

    const payload = {
      image_id: id,
      sub_id: Env.SUB_ID,
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
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        <Icon size={50} name="rocket" color="#b334Df"></Icon>
      </Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          textAlign: 'center',
        }}>
        Votes
      </Text>
      <Card>
        {props.isLoader ? (
          <LoaderIndicator isShow={props.isLoader} />
        ) : (
          props.voteImages.map((cat, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
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
                    marginVertical: 10,
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
          ))
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbWrapper: {
    flex: 1,
    marginHorizontal: 70,
  },
  imgWrapper: {
    height: 180,
    width: 180,
  },
});

Vote.propTypes = {
  voteImages: propTypes.array,
};
