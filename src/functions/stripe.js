import { getBaseUrl } from './getBaseUrl';
import axios from 'axios';

const baseUrl = getBaseUrl('/payment/stripe');

export const createPaymentIntent = (accessToken, coupon) =>
	axios.post(`${baseUrl}`, { isApplyCounpon: coupon }, { headers: { accessToken } });
