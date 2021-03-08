import axios from 'axios';
import {ToastAndroid} from 'react-native';

const Axios = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  params: {
    sub_id: 'USERABC',
  },
});

Axios.defaults.headers.common['x-api-key'] =
  'd82040a9-5732-44d3-85aa-a9c6280a145f';

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error).then((error) =>
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      ),
    );
  },
);

export default Axios;
