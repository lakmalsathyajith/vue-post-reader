import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_POST_API_BASE_URL,
});

export default httpClient;
