// api.js
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
const api = axios.create({
      baseURL: url,
      withCredentials: true,
      withXSRFToken: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
});

export default api;
