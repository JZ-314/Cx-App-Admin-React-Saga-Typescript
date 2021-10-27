import Axios from 'axios';

const accessToken = localStorage.getItem('accessToken');
// export const API_HOST = 'http://localhost:8000';

const API_HOST = process.env.REACT_APP_API_URL;

export default Axios.create({
  baseURL: API_HOST,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer ' + accessToken,
  },
  timeout: 100000,
});
