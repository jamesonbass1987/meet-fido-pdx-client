import axios from 'axios';

const instance = axios.create({
  baseURL: "https://meet-fido-pdx-api.herokuapp.com/api/v1",
  headers: { Authorization: localStorage.getItem("token") }
});

export default instance;