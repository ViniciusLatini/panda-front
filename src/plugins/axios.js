import { useAppStore } from '@/stores/app';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL
})

axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token)
    config.headers.Authorization = `Bearer ${token}`;
  return config
})

axiosClient.interceptors.response.use(response => {
  return response
}, error => {
  const appStore = useAppStore()
  if (error.status === 403) {
    appStore.logout()
  }
  throw error
})

export default axiosClient;