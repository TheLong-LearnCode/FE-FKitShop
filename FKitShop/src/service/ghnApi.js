import axios from 'axios';

const GHN_API_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';
const GHN_TOKEN = '4acfbf67-8331-11ef-8e53-0a00184fe694'; // Thay thế bằng token thực của bạn

const ghnApi = axios.create({
  baseURL: GHN_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Token': GHN_TOKEN
  }
});

export const getProvinces = async () => {
  try {
    const response = await ghnApi.get('/province');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

export const getDistricts = async (provinceId) => {
  try {
    const response = await ghnApi.get('/district', { params: { province_id: provinceId } });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const getWards = async (districtId) => {
  try {
    const response = await ghnApi.get('/ward', { params: { district_id: districtId } });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching wards:', error);
    throw error;
  }
};

export const calculateShippingFee = async (data) => {
  try {
    const response = await ghnApi.post('/calculate-fee', data);
    return response.data.data.total;
  } catch (error) {
    console.error('Error calculating shipping fee:', error);
    throw error;
  }
};