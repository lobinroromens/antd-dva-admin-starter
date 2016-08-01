import request from '../utils/request';
import config from '../config';
import qs from "qs";
export async function login(params) {
  return request(`${config.apiBaseUrl}/user/login`,{
    method:"POST",
    body:qs.stringify(params)
  });
}
