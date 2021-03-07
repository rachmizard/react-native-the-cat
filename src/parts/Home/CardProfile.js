import React from 'react';
import {Image, Text, View} from 'react-native';
import Button from '../../components/Button';
import {Card} from '../../components/Card';

export const CardProfile = (props) => {
  return (
    <Card>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          margin: 10,
        }}>
        <Image
          source={{
            uri:
              'https://yt3.ggpht.com/yti/ANoDKi6ZRvnUjMIq0Wmnk3koleJ0zCKiDb5Z15EkcT1Ge5M=s160-c-k-c0x00ffffff-no-rj',
          }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            marginRight: 14,
          }}></Image>
        <View style={{width: 200}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              maxWidth: 'auto',
              color: '#333',
            }}>
            Rachmizard
          </Text>
          <Text style={{color: '#9e9e9e'}}> rachmizard11072000@gmail.com</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-around',
            }}>
            <View>
              <Button
                onPress={() => props.navigation.navigate('Order')}
                type="primary">
                My Order
              </Button>
            </View>
            <View>
              <Button
                type="primary"
                onPress={() =>
                  props.navigation.navigate('Profile', {name: 'Jane'})
                }>
                Profile
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};
