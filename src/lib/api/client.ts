import axios from 'axios';
import axiosRetry from 'axios-retry';

export const REST_API_BASE = 'https://pokeapi.co/api/v2';
export const GRAPHQL_API_BASE = 'https://beta.pokeapi.co/graphql/v1beta';

const apiClient = axios.create({
  baseURL: REST_API_BASE,
  timeout: 10000,
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
  },
});

export default apiClient;
