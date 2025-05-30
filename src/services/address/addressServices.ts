import { SuccessResponse } from '@/services/type';
import axios from 'axios';
export type TProvincesResponse = {
  _id: string;
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
};

export type TDistrictsResponse = Omit<TProvincesResponse, 'phone_code'> & {
  province_code: number;
};

export type TWardsResponse = Omit<TProvincesResponse, 'phone_code'> & {
  district_code: number;
};

const addressServices = {
  getProvinces: () => {
    return axios.get<SuccessResponse<TProvincesResponse[]>>(
      `https://province.api.ntk2905.site/address/provinces`,
    );
  },
  getDistricts: (province_code = '') => {
    return axios.get<SuccessResponse<TDistrictsResponse[]>>(
      `https://province.api.ntk2905.site/address/districts${
        province_code ? `/${province_code}` : ''
      }`,
    );
  },
  getWards: (district_code = '') => {
    return axios.get<SuccessResponse<TWardsResponse[]>>(
      `https://province.api.ntk2905.site/address/wards${
        district_code ? `/${district_code}` : ''
      }`,
    );
  },
};
export default addressServices;
