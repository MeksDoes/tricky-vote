import axios from 'axios';
console.log(import.meta.env.VITE_API_ENDPOINT);
debugger;
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});
// instance.defaults.headers.post['Content-Type'] = 'application/json';
export default instance;
