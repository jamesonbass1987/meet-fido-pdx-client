import axios from 'axios';

const instance = axios.create({
  baseURL: "https://meet-fido-pdx-api.herokuapp.com/api/v1",
  headers: {
    Authorization: localStorage.getItem("token"),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentails": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  }
});

export default instance;
