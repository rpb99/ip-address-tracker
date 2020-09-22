import http from './httpService';
const apiKey = process.env.REACT_APP_API_KEY;

export function getLocation(search) {
  return http.get(`/v1?apiKey=${apiKey}&ipAddress=${search}&domain=${search}`);
}
