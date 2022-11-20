import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const ADMIN_BASE_URL = getBaseUrl('/admin');

export const getAllOrders = async (accessToken) =>
	await axios.get(`${ADMIN_BASE_URL}/orders`, { headers: { accessToken } });

export const updateOrderStatus = async (orderId, orderStatus, accessToken) =>
	await axios.put(
		`${ADMIN_BASE_URL}/order`,
		{ orderId, orderStatus },
		{ headers: { accessToken } }
	);
