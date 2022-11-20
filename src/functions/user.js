import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const baseUrl = getBaseUrl('/user');

export const userCheckout = (cart, accessToken) =>
	axios.post(`${baseUrl}/checkout`, { cart }, { headers: { accessToken } });

export const getUserCart = (accessToken) =>
	axios.get(`${baseUrl}/cart`, { headers: { accessToken } });

export const emptyUserCart = (accessToken) =>
	axios.delete(`${baseUrl}/cart`, { headers: { accessToken } });

export const updateUserAddress = (address, accessToken) =>
	axios.post(`${baseUrl}/cart/address`, { address }, { headers: { accessToken } });

export const applyCoupon = async (coupon, accessToken) =>
	await axios.post(`${baseUrl}/coupon`, { coupon }, { headers: { accessToken } });
