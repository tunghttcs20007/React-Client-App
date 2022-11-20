import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const baseUrl = getBaseUrl('/coupon');

export const getAllCoupons = async () => {
	return await axios.get(getBaseUrl('/coupons'));
};

export const createCoupon = async (coupon, accessToken) =>
	await axios.post(`${baseUrl}`, { coupon }, { headers: { accessToken } });

export const removeCoupon = async (accessToken, couponId) =>
	await axios.delete(`${baseUrl}/${couponId}`, { headers: { accessToken } });
