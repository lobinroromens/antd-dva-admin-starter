import request from '../utils/request';
import config from '../config';
import qs from "qs";
export async function getAddressList(params) {
  return request(`${config.apiBaseUrl}/addressList`);
}
export async function getAddressDetail(params){
  return request(`${config.apiBaseUrl}/addressList?${qs.stringify(params)}`)
}
