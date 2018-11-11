import getConfig from 'next/config';
import axios from 'axios';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const serverInstance = axios.create({
  baseURL: `${serverRuntimeConfig.apiUrl}/api`,
});

const clientInstance = axios.create({
  baseURL: `${publicRuntimeConfig.host}/api`,
});

const instance = () => {
  if (typeof window === 'undefined') {
    return serverInstance;
  }
  return clientInstance;
};

export default instance;
