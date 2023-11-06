import axios from 'axios'
import jwt, { JwtPayload } from 'jsonwebtoken'


const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwt.decode(token) as JwtPayload;
    if (decodedToken && decodedToken.exp) {
      const currentTime = Date.now() / 1000;
      return currentTime > decodedToken.exp;
    } else {
      return true; 
    }
  } catch (error) {
    return true; 
  }
};


export const useToken = () => {
  const token = localStorage.getItem('token')
  if (token && !isTokenExpired(token)) {
    return token || ''
  } else {
    localStorage.removeItem('token')
    return ''
  }
}

const token = useToken()

const axiosInstance = axios.create({
  baseURL: 'http://localhost:40001/api/v0',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

axiosInstance.interceptors.request.use((req) => {
  const token = useToken()
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default axiosInstance
