import React, {Component} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import Axios from '../../config/axios';
import {CardProfile} from '../../parts/Home/CardProfile';
import {Cats} from '../../parts/Home/Cats';

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

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  onRefresh = () => {
    this.setState({isRefresh: true});
    this.wait(200)
      .then(() => {
        this.callMostPicked();
        this.callCatOfBreeds();
      })
      .then(() => this.setState({isRefresh: false}));
  };

  componentDidMount() {
    this.callMostPicked();
    this.callCatOfBreeds();
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
      </ScrollView>
    );
  }
}
