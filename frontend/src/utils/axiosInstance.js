import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://yoriqulov-cc.herokuapp.com'
})

export default axiosInstance