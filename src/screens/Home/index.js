import React, {Component} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import Axios from '../../config/axios';
import {CardProfile} from '../../parts/Home/CardProfile';
import {Cats} from '../../parts/Home/Cats';
import {Vote} from '../../parts/Home/Vote';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: {
        page: 0,
        limit: 10,
      },
      catsMostPicked: [],
      catOfBreeds: [],
      voteImages: [],
      isRefresh: false,
    };
  }

  async callMostPicked() {
    return await Axios.get('/images/search', {
      params: {...this.state.payload},
    }).then((res) => {
      this.setState({catsMostPicked: res.data});
    });
  }

  async callCatOfBreeds() {
    return await Axios.get('/breeds', {
      params: {...this.state.payload},
    }).then((res) => {
      this.setState({catOfBreeds: res.data});
    });
  }

  async fetchVoteImages() {
    const payload = {...this.state.payload, page: 0, limit: 1};
    return await Axios.get('/images/search', {
      params: payload,
    }).then((res) => {
      this.setState({voteImages: res.data});
    });
  }

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  onRefresh = () => {
    this.setState({isRefresh: true});
    this.wait(50)
      .then(() => {
        this.callMostPicked();
        this.callCatOfBreeds();
      })
      .then(() => this.setState({isRefresh: false}));
  };

  componentDidMount() {
    this.callMostPicked();
    this.callCatOfBreeds();
    this.fetchVoteImages();
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefresh}
            onRefresh={this.onRefresh}
          />
        }>
        <CardProfile navigation={this.props.navigation}></CardProfile>
        <Cats
          mostPicked={this.state.catsMostPicked}
          catOfBreeds={this.state.catOfBreeds}></Cats>
        <Vote
          fetchVoteImages={this.fetchVoteImages.bind(this)}
          voteImages={this.state.voteImages}></Vote>
      </ScrollView>
    );
  }
}
