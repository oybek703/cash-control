import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://cc-yoriqulov.herokuapp.com'
})

export default axiosInstance