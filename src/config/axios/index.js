import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {Env} from '..';

const Axios = axios.create({
  baseURL: Env.API_URL,
  params: {
    sub_id: Env.SUB_ID,
  },
});

Axios.defaults.headers.common['x-api-key'] = Env.API_KEY;

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
