import axios from 'axios'

// 공통 axios 인스턴스
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
