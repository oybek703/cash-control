import axios from 'axios'

const axiosInstance = axios.create({
    // baseURL: 'https://yoriqulov-cc.herokuapp.com'
    baseURL: 'http://localhost:8000'
})

export default axiosInstance