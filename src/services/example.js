import request from '../utils/request';
import config from '../config';
export async function query() {
  return request('/api/users');
}
