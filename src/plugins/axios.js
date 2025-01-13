import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL
})

export default axiosClient;