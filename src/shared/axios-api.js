import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://meet-fido-pdx-api.herokuapp.com',
    headers: { Authorization: localStorage.getItem('token') }
});

export default instance;