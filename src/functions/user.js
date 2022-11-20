import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const USER_BASE_URL = getBaseUrl('/user');
const ORDER_BASE_URL = getBaseUrl('/order');

export const userCheckout = (cart, accessToken) =>
	axios.post(`${USER_BASE_URL}/checkout`, { cart }, { headers: { accessToken } });

export const getUserCart = (accessToken) =>
	axios.get(`${USER_BASE_URL}/cart`, { headers: { accessToken } });

export const emptyUserCart = (accessToken) =>
	axios.delete(`${USER_BASE_URL}/cart`, { headers: { accessToken } });

export const updateUserAddress = (address, accessToken) =>
	axios.post(`${USER_BASE_URL}/cart/address`, { address }, { headers: { accessToken } });

export const applyCoupon = async (coupon, accessToken) =>
	await axios.post(`${USER_BASE_URL}/coupon`, { coupon }, { headers: { accessToken } });

export const createOnlinePaymentOrder = async (paymentData, accessToken) =>
	axios.post(`${ORDER_BASE_URL}/create`, { paymentData }, { headers: { accessToken } });

export const createOrderWithCOD = async (accessToken, isCashOnDelivery, coupon) =>
	axios.post(
		`${ORDER_BASE_URL}/create/cash-order`,
		{ cod: isCashOnDelivery, coupon },
		{ headers: { accessToken } }
	);

export const getUserOrders = (accessToken) =>
	axios.get(`${ORDER_BASE_URL}/listAll`, { headers: { accessToken } });

export const getUserWishlist = (accessToken) =>
	axios.get(`${USER_BASE_URL}/wishlist`, { headers: { accessToken } });

export const addProductToWishList = (accessToken, productId) =>
	axios.post(`${USER_BASE_URL}/wishlist`, { productId }, { headers: { accessToken } });

export const removeProductToWishList = (accessToken, productId) =>
	axios.put(`${USER_BASE_URL}/wishlist/${productId}`, {}, { headers: { accessToken } });
