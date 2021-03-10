import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import LoaderIndicator from '../../components/LoaderIndicator';
import {Axios, Env} from '../../config';

export default class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        sub_id: Env.SUB_ID,
        page: 0,
        order: 'Desc',
      },
      isLoading: false,
      favourites: [],
    };
  }

  async fetchMyFavourite() {
    this.setState({isLoading: true});
    return Axios.get('/favourites', {params: this.state.payload})
      .then((res) => {
        this.setState({favourites: res.data});
      })
      .then(() => this.setState({isLoading: false}));
  }

  componentDidMount() {
    this.fetchMyFavourite();
  }

  componentWillUnmount() {
    this.setState({favourites: []});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? (
          <LoaderIndicator isShow={this.state.isLoading} />
        ) : (
          <FlatList
            numColumns={2}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading}
                onRefresh={this.fetchMyFavourite.bind(this)}
              />
            }
            scrollEnabled={true}
            data={this.state.favourites}
            ListEmptyComponent={() => (
              <View style={{alignSelf: 'center'}}>
                <Text style={styles.title}>No data</Text>
              </View>
            )}
            renderItem={({item}) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  margin: 1
                }}>
                <Image
                  source={{uri: item.image.url}}
                  style={styles.imgThumbnail}
                />
              </View>
            )}
            keyExtractor={(item, index) => index}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imgThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    borderRadius: 1,
  },
});
